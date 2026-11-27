#!/usr/bin/env node
/*
 * check-names.mjs - the gate that keeps the names in the docs from drifting.
 *
 *   npm run check
 *
 * Every `zabaputil_*` name written in docs/**\/*.md must exist in the sources
 * of abap-util/abap-util or abap-util/business-api:
 *
 *   zabaputil_cl_util_log          an object - a file under src/ carries the name
 *   zabaputil_cl_srt_*             a prefix (followed by `*` or ending in `_`) -
 *                                  at least one object starts with it
 *   zabaputil_cl_util_db=>save     a member - the class declares it (METHODS,
 *                                  CLASS-METHODS; types, constants and
 *                                  attributes count as well, so `=>ty_t_range`
 *                                  is checked the same way)
 *
 * Names are compared case-insensitively. A name that is wrong on purpose goes
 * into ALLOW below, with its reason.
 *
 * Sources - a shallow clone into a temp directory, or a local checkout:
 *
 *   ABAP_UTIL_REF     branch, tag or commit of abap-util/abap-util    (default: main)
 *   BUSINESS_API_REF  branch, tag or commit of abap-util/business-api (default: main)
 *   ABAP_UTIL_DIR     a local checkout instead of the clone (offline)
 *   BUSINESS_API_DIR  a local checkout instead of the clone (offline)
 *
 * Prints file:line for every finding and exits 1 on any.
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = join(ROOT, "docs");

// Names the docs use on purpose although no object carries them - each with
// its reason. An entry no page uses any more is a finding: remove it.
const ALLOW = new Map([
  // ["zabaputil_example", "why the docs name something that does not exist"],
]);

const SOURCES = [
  { repo: "abap-util/abap-util", ref: "ABAP_UTIL_REF", dir: "ABAP_UTIL_DIR" },
  {
    repo: "abap-util/business-api",
    ref: "BUSINESS_API_REF",
    dir: "BUSINESS_API_DIR",
  },
];

// ---------------------------------------------------------------- sources
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const temp = [];
function checkout(source) {
  const local = process.env[source.dir];
  if (local) {
    const dir = resolve(local);
    if (!existsSync(join(dir, "src")))
      throw new Error(`${source.dir}=${local}: no src/ directory there`);
    console.log(`check-names: ${source.repo} from ${dir}`);
    return dir;
  }
  const ref = process.env[source.ref] || "main";
  const dir = mkdtempSync(join(tmpdir(), "check-names-"));
  temp.push(dir);
  const git = (...a) =>
    execFileSync("git", a, { cwd: dir, stdio: ["ignore", "ignore", "pipe"] });
  try {
    // init + fetch instead of clone: takes a branch, a tag or a commit
    git("init", "--quiet");
    git(
      "fetch",
      "--quiet",
      "--depth",
      "1",
      `https://github.com/${source.repo}`,
      ref,
    );
    git("checkout", "--quiet", "FETCH_HEAD");
  } catch (e) {
    throw new Error(
      `cannot fetch ${source.repo} at ${ref}: ${String(e.stderr || e.message).trim()}\n` +
        `(offline? point ${source.dir} at a local checkout)`,
    );
  }
  console.log(`check-names: ${source.repo} at ${ref}`);
  return dir;
}

// The declarations of a class or interface: comments, literals and pragmas
// removed, split into statements.
function statements(file) {
  let text = readFileSync(file, "utf8").replace(/^﻿/, "");
  // only the definition - the implementation declares nothing
  const impl = text.search(/^\s*CLASS\s+\S+\s+IMPLEMENTATION\b/im);
  if (impl >= 0) text = text.slice(0, impl);
  return text
    .split("\n")
    .map((line) =>
      line.startsWith("*")
        ? ""
        : line
            .replace(/'(?:[^']|'')*'|`(?:[^`]|``)*`|\|[^|]*\|/g, "''")
            .replace(/".*$/, "")
            .replace(/##\w+/g, " "),
    )
    .join("\n")
    .split(/\.(?=\s|$)/)
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

// `!` escapes a name that is also a keyword; a redefined interface method is
// declared as `intf~name`
const clean = (name) => (name || "").replace(/^!/, "").toLowerCase();

function membersOf(file) {
  const members = new Set();
  const add = (name) => {
    name = clean(name);
    if (!/^[a-z_/][a-z0-9_/~]*$/.test(name)) return;
    members.add(name);
    if (name.includes("~")) members.add(name.split("~").pop());
  };
  let depth = 0; // inside BEGIN OF ... END OF - components, not members
  for (const stmt of statements(file)) {
    const m = stmt.match(
      /^(CLASS-METHODS|METHODS|TYPES|CONSTANTS|CLASS-DATA|DATA|ALIASES|CLASS-EVENTS|EVENTS)\b\s*:?\s*(.*)$/is,
    );
    if (!m) continue;
    const isMethod = /METHODS$/i.test(m[1]);
    // a colon chains declarations with commas; a method declaration has no
    // other comma, a structure has one per component
    for (const part of m[2].split(",")) {
      const words = part.trim().split(" ");
      if (isMethod) {
        add(words[0]);
        continue;
      }
      if (/^BEGIN$/i.test(words[0])) {
        // BEGIN OF [ENUM] name
        if (depth === 0) add(words[/^ENUM$/i.test(words[2]) ? 3 : 2]);
        depth++;
      } else if (/^END$/i.test(words[0])) {
        depth = Math.max(0, depth - 1);
      } else if (depth === 0) {
        add(words[0]);
      }
    }
  }
  return members;
}

const objects = new Set(); // every object name, lower case
const members = new Map(); // class or interface -> Set of member names

function collect(dir) {
  for (const file of walk(join(dir, "src"))) {
    const name = basename(file).split(".")[0].toLowerCase();
    if (!name.startsWith("zabaputil_")) continue; // package.devc.xml
    objects.add(name);
    if (/\.(clas|intf)\.abap$/i.test(file)) members.set(name, membersOf(file));
  }
}

// ------------------------------------------------------------------- docs
function scan() {
  const findings = [];
  const used = new Set();
  let tokens = 0;
  const files = walk(DOCS)
    .filter((f) => f.endsWith(".md"))
    .sort();
  for (const file of files) {
    const rel = relative(ROOT, file);
    readFileSync(file, "utf8")
      .split("\n")
      .forEach((line, i) => {
        const report = (text) => findings.push(`${rel}:${i + 1}: ${text}`);
        for (const m of line.matchAll(
          /zabaputil_[a-z0-9_]+(\*|(?:=>|->)[a-z0-9_~]+)?/gi,
        )) {
          tokens++;
          const [name, rest = ""] = m[0].toLowerCase().split(/(?=\*|=>|->)/);
          if (ALLOW.has(name)) {
            used.add(name);
            continue;
          }
          if (rest === "*" || name.endsWith("_")) {
            if (![...objects].some((o) => o.startsWith(name)))
              report(`no object starts with ${name}`);
            continue;
          }
          if (!objects.has(name)) {
            report(`${name} does not exist`);
            continue;
          }
          if (!rest) continue;
          const member = rest.slice(2);
          const known = members.get(name);
          if (!known) report(`${name} is no class or interface (${m[0]})`);
          else if (!known.has(member))
            report(`${name} has no method or other member ${member}`);
        }
      });
  }
  for (const name of ALLOW.keys())
    if (!used.has(name))
      findings.push(
        `scripts/check-names.mjs: ALLOW names ${name}, which no page uses`,
      );
  return { findings, files: files.length, tokens };
}

// ------------------------------------------------------------------- main
let code = 0;
try {
  for (const source of SOURCES) collect(checkout(source));
  const { findings, files, tokens } = scan();
  for (const f of findings) console.log(f);
  console.log(
    `check-names: ${tokens} names in ${files} pages against ${objects.size} objects - ` +
      (findings.length ? `${findings.length} finding(s)` : "ok"),
  );
  if (findings.length) code = 1;
} catch (e) {
  console.error(`check-names: ${e.message}`);
  code = 2;
} finally {
  for (const dir of temp) rmSync(dir, { recursive: true, force: true });
}
process.exit(code);
