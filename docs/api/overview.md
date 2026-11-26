# API Overview

Pick a topic to drill into the API reference. Every helper listed here lives on the context class `zabaputil_cl_util_context` unless stated otherwise.

## Strings & Conversion

- [Strings](./strings) — trim, case, contains/starts/ends, split, join
- [Conversion & Encoding](./conversion) — string ↔ xstring, Base64, dates
- [Time & Date](./time) — timestamps and arithmetic

## Data Formats

- [JSON](./json) — `json_stringify`, `json_parse`, filters
- [XML](./xml) — `xml_stringify`, `xml_parse`, S-RTTI variant, fluent builder
- [CSV](./csv) — internal table ↔ CSV
- [XLSX / Excel](./xlsx) — internal table ↔ XLSX

## Internal Tables & Filters

- [Internal Tables](./itab) — corresponding moves, struct extraction, sort/slice/paginate, value filter
- [Filters & Tokens](./filters) — multi-filter structures, SmartFilterBar tokens, SQL where
- [Ranges](./ranges) — ABAP ranges and SQL builders (`zabaputil_cl_util_range`)

## Data & Validation

- [Validation](./validation) — e-mail, numeric, date, GUID and length checks
- [Data Compare & Access](./data) — deep equality, field diffs, nested access by path
- [Calendar & Workdays](./calendar) — weekday checks and workday arithmetic
- [ZIP Archives](./zip) — `zip_pack`, `zip_unpack`

## Runtime & Reflection

- [RTTI](./rtti) — type kind, attributes, dynamic table creation, class lookups
- [Booleans](./booleans) — `boolean_check_by_data`, `boolean_check_by_name`, `boolean_abap_2_json`
- [UUIDs](./uuid) — 32-char hex and 22-char base64
- [Source & Apps](./source) — read source code, build app URLs

## Messaging & Errors

- [Messages](./messages) — extract messages from structures, exceptions and BAL
- [Texts & Domains](./texts) — T100 texts, domain fixed values (enum-style)
- [Errors & Exceptions](./errors) — `zabaputil_cx_util_error` and the `x_*` helpers
- [Logging](./logging) — `zabaputil_cl_util_log`, fluent log builder
- [Application Log (BAL)](./bal) — search, read and clean up application logs
- [UI5 Messages](./ui5) — translate ABAP types into UI5 message types

## Web & Persistence

- [URL Parameters](./url) — read, build and update URL query strings
- [HTTP Handler](./http) — `zabaputil_cl_util_http`, unified request/response wrapper
- [Persistence](./persistence) — `zabaputil_cl_util_db`, generic key/value store
- [Context](./context) — current user, tenant, callstack, cloud detection

## Platform & Administration

- [Locks (Enqueue)](./locks) — set, check, release and inspect locks
- [Transport Requests](./transport) — read, create and manage CTS requests
- [System Utilities](./system) — authorization, number ranges, change documents, jobs, mail
- [Parallel Processing](./parallel) — `parallel_run`, tasks via `CL_ABAP_PARALLEL`
- [RFC](./rfc) — call function modules with JSON parameters, ping destinations

## Business Objects & Output

Pages marked *Standard ABAP* raise `zabaputil_cx_util_error` on ABAP Cloud.

- [Barcodes (GS1)](./barcodes) — parse, build and check GS1-128, GS1 DataMatrix and GS1 QR codes
- [Long Texts (SAPscript)](./longtext) — read, save and delete long texts as strings (*Standard ABAP*)
- [MIME, Spool & Forms](./mime) — MIME repository, spool and Adobe forms as PDF (*Standard ABAP*)
- [Report Variants](./variants) — list variants and read their values (*Standard ABAP*)
- [ABAP Messaging Channels](./amc) — `amc_send` (*Standard ABAP*)
- [Attachments (GOS)](./gos) — attach, list and read GOS attachments (*Standard ABAP*)
