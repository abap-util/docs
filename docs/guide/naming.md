# Naming Conventions

`abap-util` follows a small set of conventions that make the API easy to navigate from code completion alone.

## Object Names

| Pattern | Used for | Example |
| --- | --- | --- |
| `zabaputil_cl_*` | Classes | `zabaputil_cl_util_log` |
| `zabaputil_cx_*` | Exception classes | `zabaputil_cx_util_error` |
| `zabaputil_if_*` | Interfaces (vendored) | `zabaputil_if_ajson_filter` |
| `zabaputil_t_*` | Database tables | `zabaputil_t_91` |

The `zabaputil_` prefix is reserved — never create your own objects under it.

## Method Prefixes

The façade `zabaputil_cl_util` groups helpers by topic. The prefix tells you what the method does without reading the body:

| Prefix | Meaning | Example |
| --- | --- | --- |
| `c_` | Character / string operation | `c_trim`, `c_split`, `c_contains` |
| `time_` | Time / date arithmetic | `time_add_seconds` |
| `rtti_` | Run-time type info | `rtti_get_type_name` |
| `json_` | JSON | `json_stringify` |
| `xml_` | XML (asXML / S-RTTI) | `xml_stringify`, `xml_srtti_parse` |
| `conv_` | Conversion / encoding | `conv_encode_x_base64` |
| `filter_` | Filter / token / range | `filter_get_sql_where` |
| `itab_` | Internal tables | `itab_corresponding` |
| `msg_` | Message extraction | `msg_get`, `msg_get_t` |
| `boolean_` | Boolean checks | `boolean_check_by_data` |
| `url_param_` | URL query handling | `url_param_get` |
| `x_` | Exception helpers | `x_check_raise`, `x_raise` |
| `ui5_` | UI5 helpers | `ui5_get_msg_type` |
| `context_` | Runtime context | `context_get_user_tech` |
| `source_` | Source code introspection | `source_get_method` |
| `app_` | App URL helpers | `app_get_url` |
| `uuid_` | UUID generation | `uuid_get_c32` |

## Verb Conventions

| Verb fragment | Meaning |
| --- | --- |
| `get_*` | Pure getter — never raises, no side effects |
| `check_*` | Returns `abap_bool` |
| `set_*` | Mutates state (instance method) |
| `add_*` | Appends to internal state (e.g. log entries) |
| `*_by_*` | Conversion: `_x_by_y` reads as "build x from y" |
| `to_*` | Renders the current state to a target format (`to_csv`, `to_xlsx`) |

For example `itab_get_csv_by_itab( val )` reads as "get a CSV from an internal table".

## Parameter Names

The library deliberately keeps parameter names **short** so calls fit on one line:

| Parameter | Meaning |
| --- | --- |
| `val` | The primary input value |
| `result` | The returning value |
| `data` | Generic, typed by `TYPE any` |
| `tab` | Internal table |
| `t_*` | Standard table of `*` |
| `s_*` | Structure of `*` |
| `n` / `v` | Name / value pair |
| `ns` | XML namespace |
| `when` | Boolean condition |

If you find a method whose parameter is not `val`, that's intentional — it usually means the method has more than one input and the names disambiguate roles (e.g. `low`/`high`, `from`/`to`).
