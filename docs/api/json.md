# JSON

The JSON helpers wrap the bundled [ajson](https://github.com/sbcgua/ajson) library so you can serialize and parse with a single call.

## `json_stringify`

Serialize any ABAP value (structure, table, ref, …) to a JSON string.

```abap
DATA(lv_json) = zabaputil_cl_util=>json_stringify( ls_flight ).
" => '{"CARRID":"LH","CONNID":"0400","FLDATE":"2025-01-15"}'
```

ABAP booleans (`abap_bool`) are mapped to JSON `true`/`false`. Empty values follow the ajson defaults — see the [filter helpers](#json-filters) below to drop them.

## `json_parse`

Deserialize a JSON string into a typed ABAP value passed by `CHANGING`.

```abap
DATA ls_flight TYPE sflight.
zabaputil_cl_util=>json_parse(
    val  = '{"CARRID":"LH","CONNID":"0400"}'
    data = ls_flight ).
```

Field names in the JSON are matched **case-insensitively** against the structure components.

## JSON Filters

The class `zabaputil_cl_util_json_fltr` implements `zabaputil_if_ajson_filter` and exposes a factory:

### `create_no_empty_values`

Returns a filter that drops `false`, `0` and empty strings, and removes empty objects/arrays once their children are filtered out.

```abap
DATA(lo_filter) = zabaputil_cl_util_json_fltr=>create_no_empty_values( ).
```

You can pass the filter into ajson directly when you need the leaner output for HTTP responses or front-end communication.

## `boolean_abap_2_json`

Convert any ABAP boolean-ish value to a JSON literal. Useful when you build JSON manually:

```abap
DATA(lv) = zabaputil_cl_util=>boolean_abap_2_json( abap_true ). " => 'true'
```
