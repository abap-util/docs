# RFC

Call function modules by name with JSON parameters, and check whether an RFC destination can be reached.

| Method | Parameters | Returns | ABAP Cloud |
| --- | --- | --- | --- |
| `rfc_call_dynamic` | `function`, `params` (optional), `destination` (optional) | `string` (JSON) | ✘ raises `zabaputil_cx_util_error` |
| `rfc_ping` | `destination` | — | ✔ with a BTP destination |
| `rfc_check_destination` | `destination` | `abap_bool` | ✔ with a BTP destination |

## `rfc_call_dynamic`

Calls a function module by name — in this session or via RFC — with its parameters as a JSON object and returns the exporting, changing and tables parameters as JSON.

- The keys of `params` are the parameter names: `{"IV_MATNR":"4711","IT_ITEMS":[{...}]}`.
- Optional importing parameters that are not given keep their default.
- `destination` is the RFC destination; initial calls the function module in this session.
- A classic exception of the function module raises `zabaputil_cx_util_error` with its name.
- The parameter types must exist in the calling system.

::: warning Standard ABAP only
On ABAP Cloud `rfc_call_dynamic` raises `zabaputil_cx_util_error`.
:::

```abap
DATA(lv_json) = zabaputil_cl_util_context=>rfc_call_dynamic(
    function    = `BAPI_USER_GET_DETAIL`
    params      = `{"USERNAME":"DEVELOPER"}`
    destination = `NONE` ).
" => '{"ADDRESS":{...},"RETURN":[...],...}'
```

Combine it with [`json_parse`](./json) to read the result into typed data:

```abap
zabaputil_cl_util_context=>json_parse( EXPORTING val  = lv_json
                                       CHANGING  data = ls_result ).
```

## `rfc_ping`

Pings a destination (`RFC_PING`) and raises `zabaputil_cx_util_error` with the communication or system failure text if it cannot be reached. On ABAP Cloud `destination` is the name of a **BTP destination**; the RFC destination is resolved via `CL_RFC_DESTINATION_PROVIDER`.

```abap
zabaputil_cl_util_context=>rfc_ping( `ZMY_DEST` ).  " raises with the communication error text
```

## `rfc_check_destination`

`abap_true` if the destination can be reached — `rfc_ping` without the exception.

```abap
IF zabaputil_cl_util_context=>rfc_check_destination( `ZMY_DEST` ) = abap_false.
  zabaputil_cl_util_context=>rfc_ping( `ZMY_DEST` ).  " raises with the error text
ENDIF.
```

## See also

- [JSON](./json) — `json_stringify` / `json_parse` for the parameters
- [Errors & Exceptions](./errors) — `zabaputil_cx_util_error`
