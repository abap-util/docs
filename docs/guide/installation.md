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
4. Pick the branch that fits your release:
   - `main` — modern ABAP (Standard ABAP and ABAP Cloud)
   - `702` — NetWeaver AS ABAP 7.02 / 7.31 / 7.40 with limited language scope
5. Choose a target package, e.g. `$Z_ABAP_UTIL` (local) or a transportable package of your choice.
6. Pull the repository.

After the pull you should see the following top-level objects in your package:

| Object | Type | Purpose |
| --- | --- | --- |
| `ZABAPUTIL_CL_UTIL` | Class | Main façade |
| `ZABAPUTIL_CL_UTIL_HTTP` | Class | HTTP handler abstraction |
| `ZABAPUTIL_CL_UTIL_LOG` | Class | Fluent log builder |
| `ZABAPUTIL_CL_UTIL_MSG` | Class | Message extractor |
| `ZABAPUTIL_CL_UTIL_RANGE` | Class | Range/SQL builder |
| `ZABAPUTIL_CL_UTIL_XML` | Class | XML builder |
| `ZABAPUTIL_CL_UTIL_JSON_FLTR` | Class | JSON filter helpers |
| `ZABAPUTIL_CX_UTIL_ERROR` | Class | Custom exception |
| `ZABAPUTIL_CL_UTIL_API` / `_API_C` / `_API_S` | Classes | Release-specific API adapters |
| `ZABAPUTIL_CL_UTIL_DB` / `ZABAPUTIL_CL_UTIL_EXT` | Classes | Persistence + extended utilities (non-cloud) |
| `ZABAPUTIL_T_91` | Table | Persistence table for [Persistence API](/api/persistence) |

## Install via abapGit (ABAP Cloud)

ABAP Cloud requires a slightly different flow:

1. Use the abapGit Fiori app `ZABAPGIT_STANDALONE` from your dev tenant.
2. Add the repository URL above.
3. Select the `main` branch.
4. Choose an ABAP Cloud package (must be assigned to a software component).
5. Pull.

The `01/` and `02/` subpackages contain release-conditional code; abapGit deploys only the objects that are valid in your tenant.

## Verify the installation

Run a quick smoke test in any ABAP report or class method:

```abap
DATA(lv_uuid) = zabaputil_cl_util=>uuid_get_c32( ).
WRITE: / lv_uuid.
```

If the report compiles and prints a 32-character UUID, the installation is complete.

## Uninstall

Use abapGit's **Uninstall** action on the cloned repository. All `ZABAPUTIL_*` objects in the target package will be deleted.
