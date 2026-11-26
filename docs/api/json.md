# JSON

The JSON helpers wrap the bundled [ajson](https://github.com/sbcgua/ajson) library so you can serialize and parse with a single call.

## `json_stringify`

Serialize any ABAP value (structure, table, ref, …) to a JSON string.

```abap
DATA(lv_json) = zabaputil_cl_util_context=>json_stringify( ls_flight ).
" => '{"CARRID":"LH","CONNID":"0400","FLDATE":"2025-01-15"}'
```

ABAP booleans (`abap_bool`) are mapped to JSON `true`/`false`. Empty values follow the ajson defaults — see the [filter helpers](#json-filters) below to drop them.

## `json_parse`

Deserialize a JSON string into a typed ABAP value passed by `CHANGING`.

```abap
DATA ls_flight TYPE sflight.
zabaputil_cl_util_context=>json_parse(
    val  = '{"CARRID":"LH","CONNID":"0400"}'
    data = ls_flight ).
```

Field names in the JSON are matched **case-insensitively** against the structure components.

## JSON Filters

`json_stringify` takes no filter. To drop empty values, use the bundled ajson directly together with its filter library `zabaputil_cl_ajson_filter_lib` (implementations of `zabaputil_if_ajson_filter`):

### `create_empty_filter`

Returns a filter that drops empty strings and `0` numbers, and removes objects/arrays that are empty or become empty once their children are filtered out.

```abap
DATA(lv_lean) = zabaputil_cl_ajson=>parse( lv_json
    )->filter( zabaputil_cl_ajson_filter_lib=>create_empty_filter( )
    )->stringify( ).
```

The library also provides `create_path_filter` (skip given paths) and `create_and_filter` (combine filters).

## `boolean_abap_2_json`

Convert any ABAP boolean-ish value to a JSON literal. Useful when you build JSON manually:

```abap
DATA(lv) = zabaputil_cl_util_context=>boolean_abap_2_json( abap_true ). " => 'true'
```
