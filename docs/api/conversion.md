# Conversion & Encoding

Helpers for converting between binary, text and date representations.

## `conv_get_xstring_by_string`

UTF-8 encode a `string` to `xstring`.

```abap
DATA(lv_x) = zabaputil_cl_util=>conv_get_xstring_by_string( 'Hello' ).
```

## `conv_get_string_by_xstring`

Decode an `xstring` (UTF-8) back into a `string`.

```abap
DATA(lv_text) = zabaputil_cl_util=>conv_get_string_by_xstring( lv_xstring ).
```

## `conv_encode_x_base64`

Base64-encode an `xstring` to a `string`.

```abap
DATA(lv_b64) = zabaputil_cl_util=>conv_encode_x_base64( lv_xstring ).
```

## `conv_decode_x_base64`

Decode a Base64 `string` back to an `xstring`.

```abap
DATA(lv_x) = zabaputil_cl_util=>conv_decode_x_base64( lv_b64 ).
```

## `conv_get_xlsx_by_itab`

Render any internal table to an XLSX `xstring` (uses the platform's spreadsheet API).

```abap
DATA(lv_xlsx) = zabaputil_cl_util=>conv_get_xlsx_by_itab( lt_flights ).
```

See also [XLSX / Excel](./xlsx).

## `conv_get_itab_by_xlsx`

Parse an XLSX `xstring` back into an internal table (returned as a typed data reference).

```abap
DATA lr_data TYPE REF TO data.
zabaputil_cl_util=>conv_get_itab_by_xlsx(
    EXPORTING val    = lv_xlsx
    IMPORTING result = lr_data ).
```

## `conv_string_to_date`

Parse a date string into ABAP `d`.

```abap
DATA(lv_date) = zabaputil_cl_util=>conv_string_to_date(
    val    = '2025-12-31'
    format = 'YYYY-MM-DD' ). " default format
```

## `conv_date_to_string`

Render an ABAP `d` to a date string.

```abap
DATA(lv_iso) = zabaputil_cl_util=>conv_date_to_string(
    val    = sy-datum
    format = 'YYYY-MM-DD' ).
```

## `conv_get_as_data_ref`

Return a generic `REF TO data` pointing at the given value (handy for dynamic calls).

```abap
DATA(lr_ref) = zabaputil_cl_util=>conv_get_as_data_ref( ls_flight ).
```

## `conv_copy_ref_data`

Create an independent copy of any value as a fresh `REF TO data`.

```abap
DATA(lr_copy) = zabaputil_cl_util=>conv_copy_ref_data( from = ls_source ).
```
