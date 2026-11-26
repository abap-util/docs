# Strings

Helpers for trimming, casing, searching, splitting and joining character data. All methods accept `clike` (or `any` where noted) and return `string`.

## `c_trim`

Trims leading and trailing whitespace.

```abap
DATA(lv_x) = zabaputil_cl_util_context=>c_trim( ` Hello World  ` ). " => 'Hello World'
```

## `c_trim_upper`

Trim + upper-case in one call.

```abap
DATA(lv_x) = zabaputil_cl_util_context=>c_trim_upper( ` Hello World  ` ). " => 'HELLO WORLD'
```

## `c_trim_lower`

Trim + lower-case in one call.

```abap
DATA(lv_x) = zabaputil_cl_util_context=>c_trim_lower( ` Hello World  ` ). " => 'hello world'
```

## `c_contains`

Returns `abap_true` if `val` contains `sub`.

```abap
IF zabaputil_cl_util_context=>c_contains( val = 'Hello World' sub = 'World' ) = abap_true.
  " ...
ENDIF.
```

## `c_starts_with`

```abap
IF zabaputil_cl_util_context=>c_starts_with( val = 'sap.com' prefix = 'sap' ) = abap_true.
  " ...
ENDIF.
```

## `c_ends_with`

```abap
IF zabaputil_cl_util_context=>c_ends_with( val = 'report.abap' suffix = '.abap' ) = abap_true.
  " ...
ENDIF.
```

## `c_split`

Splits a string by a separator into a `string_table`.

```abap
DATA(lt_parts) = zabaputil_cl_util_context=>c_split(
    val = 'a,b,c,d'
    sep = ',' ).
" => ('a','b','c','d')
```

## `c_join`

Joins a `string_table` back into a single string.

```abap
DATA(lv_csv) = zabaputil_cl_util_context=>c_join(
    tab = VALUE string_table( ( `a` ) ( `b` ) ( `c` ) )
    sep = `,` ). " => 'a,b,c'
```

If `sep` is omitted the parts are concatenated without a separator.

## `c_pad_left`

Pads a value on the left up to `len` characters. Default pad character is `0` — handy for leading-zero numbers.

```abap
DATA(lv_x) = zabaputil_cl_util_context=>c_pad_left( val = `42` len = 5 ).            " => '00042'
DATA(lv_y) = zabaputil_cl_util_context=>c_pad_left( val = `42` len = 5 pad = ' ' ).  " => '   42'
```

## `c_pad_right`

Pads a value on the right up to `len` characters. Default pad character is a space.

```abap
DATA(lv_x) = zabaputil_cl_util_context=>c_pad_right( val = `AB` len = 5 pad = '.' ). " => 'AB...'
```

## `c_truncate`

Shortens a string to at most `max` characters, appending an ellipsis when it was cut. The ellipsis counts toward `max`.

```abap
DATA(lv_x) = zabaputil_cl_util_context=>c_truncate( val = `Hello World` max = 8 ).   " => 'Hello...'
DATA(lv_y) = zabaputil_cl_util_context=>c_truncate( val = `Hi` max = 8 ).            " => 'Hi' (unchanged)
```

Pass an empty `ellipsis` to truncate without a marker.

## `c_substring_safe`

`substring( )` without the short dump: offset/length out of bounds simply clamp to the available characters.

```abap
DATA(lv_x) = zabaputil_cl_util_context=>c_substring_safe( val = `abc` off = 1 len = 99 ). " => 'bc'
DATA(lv_y) = zabaputil_cl_util_context=>c_substring_safe( val = `abc` off = 9 ).          " => ''
```

`len = -1` (default) means "to the end of the string".

## `c_replace_all`

Replaces every occurrence of `sub` with `new_val`.

```abap
DATA(lv_x) = zabaputil_cl_util_context=>c_replace_all(
    val     = `a-b-c`
    sub     = `-`
    new_val = `_` ). " => 'a_b_c'
```

## `c_is_blank`

Returns `abap_true` when the value is empty or contains only whitespace.

```abap
IF zabaputil_cl_util_context=>c_is_blank( lv_input ) = abap_true.
  " nothing entered
ENDIF.
```

## See also

- [Validation](./validation) — e-mail, GUID, date and length checks
