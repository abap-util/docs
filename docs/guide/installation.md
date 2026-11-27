# Installation

`abap-util` is distributed as plain ABAP source code via [abapGit](https://abapgit.org) — no transports, no add-on installer.

## Prerequisites

- A SAP system meeting the [Compatibility](./compatibility) requirements
- [abapGit](https://abapgit.org) installed (see the abapGit docs for your platform)
- A development package to clone the repository into

## Install via abapGit (Standard)

1. Open transaction `ZABAPGIT` (or the abapGit Fiori app for ABAP Cloud).
2. Choose **+ New Online**.
3. Enter the repository URL:
   ```
   https://github.com/abap-util/abap-util
   ```
4. Pick the branch that fits your system (see [Branches](#branches)).
5. Choose a target package, e.g. `$Z_ABAP_UTIL` (local) or a transportable package of your choice.
6. Pull the repository.

After the pull you should see the following top-level objects in your package:

| Object | Type | Purpose |
| --- | --- | --- |
| `ZABAPUTIL_CL_UTIL_CONTEXT` | Class | Context class with all static helpers |
| `ZABAPUTIL_CL_UTIL_HTTP` | Class | HTTP handler abstraction and HTTP client |
| `ZABAPUTIL_CL_UTIL_DB` | Class | Key/value persistence |
| `ZABAPUTIL_CL_UTIL_LOG` | Class | Fluent log builder |
| `ZABAPUTIL_CL_UTIL_MSG` | Class | Message extractor |
| `ZABAPUTIL_CL_UTIL_RANGE` | Class | Range/SQL builder |
| `ZABAPUTIL_CL_UTIL_XML` | Class | XML builder |
| `ZABAPUTIL_CX_UTIL_ERROR` | Class | Exception |
| `ZABAPUTIL_T_91` | Table | Persistence table for [Persistence API](/api/persistence) |
| `ZABAPUTIL_CL_AJSON*`, `ZABAPUTIL_CL_SRT_*` | Classes | Embedded ajson and S-RTTI (subpackages `00/01`, `00/02`) |

## Branches {#branches}

| Branch | For |
| --- | --- |
| `main` | NetWeaver 7.50 and higher, S/4HANA, ABAP Cloud |
| `702` | NetWeaver 7.02 to 7.4x — downported from `main` automatically on every push |
| `rename_<name>` | An installation under another name (e.g. `ZMYUTIL` or `/MYNS/`), built on request — see [Renaming](./renaming) |

All branches carry the same methods; `702` is generated from `main` by the `auto_downport` workflow, so never change it directly.

## Install via abapGit (ABAP Cloud)

ABAP Cloud requires a slightly different flow:

1. Use the abapGit Fiori app `ZABAPGIT_STANDALONE` from your dev tenant.
2. Add the repository URL above.
3. Select the `main` branch.
4. Choose an ABAP Cloud package (must be assigned to a software component).
5. Pull.

Methods that need Standard ABAP (long texts, MIME repository, spool, forms, variants, AMC, GOS, `rfc_call_dynamic`) compile on ABAP Cloud as well, but raise `zabaputil_cx_util_error` when called — see [Cloud vs. On-Premise](./cloud-vs-onprem).

## Verify the installation

Run a quick smoke test in any ABAP report or class method:

```abap
DATA(lv_uuid) = zabaputil_cl_util_context=>uuid_get_c32( ).
WRITE: / lv_uuid.
```

If the report compiles and prints a 32-character UUID, the installation is complete.

## Uninstall

Use abapGit's **Uninstall** action on the cloned repository. All `ZABAPUTIL_*` objects in the target package will be deleted.
