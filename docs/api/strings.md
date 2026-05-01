# Strings

Helpers for trimming, casing, searching, splitting and joining character data. All methods accept `clike` (or `any` where noted) and return `string`.

## `c_trim`

Trims leading and trailing whitespace.

```abap
DATA(lv_x) = zabaputil_cl_util=>c_trim( ` Hello World  ` ). " => 'Hello World'
```

## `c_trim_upper`

Trim + upper-case in one call.

```abap
DATA(lv_x) = zabaputil_cl_util=>c_trim_upper( ` Hello World  ` ). " => 'HELLO WORLD'
```

## `c_trim_lower`

Trim + lower-case in one call.

```abap
DATA(lv_x) = zabaputil_cl_util=>c_trim_lower( ` Hello World  ` ). " => 'hello world'
```

## `c_contains`

Returns `abap_true` if `val` contains `sub`.

```abap
IF zabaputil_cl_util=>c_contains( val = 'Hello World' sub = 'World' ) = abap_true.
  " ...
ENDIF.
```

## `c_starts_with`

```abap
IF zabaputil_cl_util=>c_starts_with( val = 'sap.com' prefix = 'sap' ) = abap_true.
  " ...
ENDIF.
```

## `c_ends_with`

```abap
IF zabaputil_cl_util=>c_ends_with( val = 'report.abap' suffix = '.abap' ) = abap_true.
  " ...
ENDIF.
```

## `c_split`

Splits a string by a separator into a `string_table`.

```abap
DATA(lt_parts) = zabaputil_cl_util=>c_split(
    val = 'a,b,c,d'
    sep = ',' ).
" => ('a','b','c','d')
```

## `c_join`

Joins a `string_table` back into a single string.

```abap
DATA(lv_csv) = zabaputil_cl_util=>c_join(
    tab = VALUE string_table( ( `a` ) ( `b` ) ( `c` ) )
    sep = `,` ). " => 'a,b,c'
```

If `sep` is omitted the parts are concatenated without a separator.
