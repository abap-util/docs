# Class Overview

A short reference of the public classes shipped by `abap-util` and what they are good for.

## Public Classes

| Class | Kind | Description |
| --- | --- | --- |
| `zabaputil_cl_util_context` | Context class | All static helpers grouped by prefix (`json_`, `xml_`, `rtti_`, `c_`, `time_`, `url_param_`, `filter_`, `itab_`, `barcode_gs1_`, `rfc_`, …). Start here. |
| `zabaputil_cl_util_db` | Service | Generic key/value persistence on top of `ZABAPUTIL_T_91`. |
| `zabaputil_cl_util_log` | Service (instance) | Fluent log builder with CSV/XLSX/BAL export. |
| `zabaputil_cl_util_http` | Service (instance) | HTTP handler abstraction for on-prem and ABAP Cloud. |
| `zabaputil_cl_http` | Helper | HTTP request/response helper. |
| `zabaputil_cl_util_msg` | Helpers | Extracts messages from structures, exceptions and BAL. |
| `zabaputil_cl_util_range` | Builder (instance) | Builds SQL `WHERE` fragments from ABAP ranges and tokens. |
| `zabaputil_cl_util_xml` | Builder (instance) | Fluent XML builder. |
| `zabaputil_cx_util_error` | Exception | Single, predictable exception type used by the library. Inherits from `cx_no_check`. |
| `zabaputil_cx_error` | Exception | No-check exception with the same structure as `zabaputil_cx_util_error`. |

ajson (`00/01/`) and S-RTTI (`00/02/`) are embedded under the `zabaputil_` prefix as well — see [Architecture](./architecture#bundled-dependencies).

## Copies in other projects

The classes are also used as **renamed copies** inside other projects — the context class trimmed to the methods each project needs. Each project renames them into its own namespace:

| Project | Copies |
| --- | --- |
| [abap2UI5](https://github.com/abap2UI5/abap2UI5) | `z2ui5_cl_ui5_util_context`, `z2ui5_cl_ui5_util_http`, `z2ui5_cx_ui5_util_error` |
| [popups](https://github.com/abap2UI5-addons/popups) | `z2ui5_cl_popup_context`, `z2ui5_cx_popup_error` |
| [business-api](https://github.com/abap-util/business-api) | `zabaputil_cl_bus_util_context`, `zabaputil_cl_bus_util_msg`, `zabaputil_cx_bus_util_error` |

business-api keeps the `zabaputil_` prefix and inserts `bus_`: `zabaputil_cl_util_context` becomes `zabaputil_cl_bus_util_context`, `zabaputil_cl_util_msg` becomes `zabaputil_cl_bus_util_msg`.

See [Consumption Model](./architecture#consumption-model) for how the copies are kept in sync.

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
| `barcode_gs1_` | GS1 barcodes | [Barcodes (GS1)](/api/barcodes) |
| `parallel_` | Parallel processing | [Parallel Processing](/api/parallel) |
| `longtext_` | SAPscript long texts | [Long Texts](/api/longtext) |
| `rfc_` | RFC calls and destinations | [RFC](/api/rfc) |
| `mime_`, `spool_`, `form_` | MIME repository, spool, Adobe forms | [MIME, Spool & Forms](/api/mime) |
| `variant_` | Report variants | [Report Variants](/api/variants) |
| `amc_` | ABAP Messaging Channels | [ABAP Messaging Channels](/api/amc) |
| `gos_` | Attachments (Generic Object Services) | [Attachments (GOS)](/api/gos) |

## Conventions

- All façade helpers are **`CLASS-METHODS`** — call them statically without instantiating the façade.
- Methods that **return data** are named with a verb-or-`get_` prefix and use a `RETURNING VALUE(result)` parameter.
- Methods that **mutate** an internal table use a `CHANGING` parameter (e.g. `itab_corresponding`, `filter_itab`).
- Methods that may **fail** raise `zabaputil_cx_util_error` — an unchecked exception, so wrap them in `TRY/CATCH` only when you want to handle the failure locally.

## Discoverability

Open the façade class in your IDE and trigger code completion after `zabaputil_cl_util_context=>` — the prefix groups make it easy to find what you need without leaving the editor.
