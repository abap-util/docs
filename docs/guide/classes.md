# Class Overview

A short reference of the public classes shipped by `abap-util` and what they are good for.

## Public Classes

| Class | Kind | Description |
| --- | --- | --- |
| `zabaputil_cl_util_context` | Façade | Static helpers grouped by prefix (`json_`, `xml_`, `rtti_`, `c_`, `time_`, `url_param_`, `filter_`, `itab_`, …). Release differences (ABAP Cloud vs. Standard ABAP) are handled inside the methods. Start here. |
| `zabaputil_cl_util_db` | Service | Generic key/value persistence on top of `ZABAPUTIL_T_91`. |
| `zabaputil_cl_util_log` | Service (instance) | Fluent log builder with CSV/XLSX/BAL export. |
| `zabaputil_cl_util_http` | Service (instance) | HTTP handler abstraction for on-prem and ABAP Cloud, plus outbound HTTP client calls. |
| `zabaputil_cl_util_msg` | Helpers | Extracts messages from structures, exceptions and BAL. |
| `zabaputil_cl_util_range` | Builder (instance) | Builds SQL `WHERE` fragments from ABAP ranges. |
| `zabaputil_cl_util_xml` | Builder (instance) | Fluent XML builder. |
| `zabaputil_cl_http` | Service (instance) | HTTP helper with the same handler/client methods (without `client_request` and `get_query`). Raises `zabaputil_cx_error`. |
| `zabaputil_cx_util_error` | Exception | Single, predictable exception type used by the library. Inherits from `cx_no_check`. |
| `zabaputil_cx_error` | Exception | Same structure as `zabaputil_cx_util_error`, plus `get_text_own`, `get_text_own_by_x` and `get_text_full`. Inherits from `cx_no_check`. |

The bundled [ajson](https://github.com/sbcgua/ajson) (`zabaputil_cl_ajson`, `zabaputil_if_ajson`, …) and [S-RTTI](https://github.com/sandraros/S-RTTI) (`zabaputil_cl_srt_*`) classes are mirrored unchanged from upstream.

## Sub-API of the façade

The façade groups helpers by **prefix**. You will rarely need anything outside of these groups:

| Prefix | Topic | Page |
| --- | --- | --- |
| `c_` | Character / strings | [Strings](/api/strings) |
| `json_` | JSON | [JSON](/api/json) |
| `xml_`, `xml_srtti_` | XML / typed XML | [XML](/api/xml) |
| `conv_` | Conversion (string ↔ xstring, base64, dates, XLSX) | [Conversion](/api/conversion) |
| `time_` | Timestamps and date arithmetic | [Time & Date](/api/time) |
| `rtti_` | Type reflection | [RTTI](/api/rtti) |
| `boolean_` | Boolean helpers | [Booleans](/api/booleans) |
| `url_param_` | URL query handling | [URL Parameters](/api/url) |
| `filter_` | Filter / token / range conversion | [Filters](/api/filters) |
| `itab_` | Internal-table helpers | [Internal Tables](/api/itab) |
| `msg_` | Message extraction | [Messages](/api/messages) |
| `text_`, `enum_` | T100 texts & domain fixed values | [Texts & Domains](/api/texts) |
| `x_` | Exception helpers | [Errors](/api/errors) |
| `bal_` | Application log queries | [Application Log](/api/bal) |
| `ui5_` | UI5 message formatting | [UI5 Messages](/api/ui5) |
| `context_` | Runtime context | [Context](/api/context) |
| `source_`, `app_` | Source code & app URL helpers | [Source & Apps](/api/source) |
| `uuid_` | UUID generation | [UUIDs](/api/uuid) |
| `check_` | Input validation | [Validation](/api/validation) |
| `data_` | Deep compare & path access | [Data Compare & Access](/api/data) |
| `cal_` | Calendar & workdays | [Calendar & Workdays](/api/calendar) |
| `zip_` | ZIP archives | [ZIP Archives](/api/zip) |
| `lock_` | Enqueue locks | [Locks](/api/locks) |
| `tr_` | Transport requests | [Transport Requests](/api/transport) |
| `auth_`, `numrange_`, `changdoc_`, `job_`, `mail_` | System utilities | [System Utilities](/api/system) |

## Conventions

- All façade helpers are **`CLASS-METHODS`** — call them statically without instantiating the façade.
- Methods that **return data** are named with a verb-or-`get_` prefix and use a `RETURNING VALUE(result)` parameter.
- Methods that **mutate** an internal table use a `CHANGING` parameter (e.g. `itab_corresponding`, `filter_itab`).
- Methods that may **fail** raise `zabaputil_cx_util_error` — an unchecked exception, so wrap them in `TRY/CATCH` only when you want to handle the failure locally.

## Discoverability

Open the façade class in your IDE and trigger code completion after `zabaputil_cl_util_context=>` — the prefix groups make it easy to find what you need without leaving the editor.
