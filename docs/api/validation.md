# Validation

Small predicate helpers for input validation. All return `abap_bool` and never raise — invalid input simply yields `abap_false`.

## `check_is_email`

Checks a string against a pragmatic e-mail pattern.

```abap
IF zabaputil_cl_util=>check_is_email( lv_input ) = abap_false.
  " reject
ENDIF.
```

## `check_is_numeric_string`

Returns `abap_true` when the string parses as a number (sign and decimal point allowed).

```abap
DATA(lv_ok) = zabaputil_cl_util=>check_is_numeric_string( `12.34` ). " => abap_true
```

## `check_is_date_valid`

Validates a date string against a format pattern — including impossible dates like February 30th.

```abap
DATA(lv_a) = zabaputil_cl_util=>check_is_date_valid( `2025-02-30` ).                       " => abap_false
DATA(lv_b) = zabaputil_cl_util=>check_is_date_valid( val = `15.03.2024` format = `DD.MM.YYYY` ).
```

Default format is `YYYY-MM-DD`.

## `check_is_guid`

Returns `abap_true` for a 32-character hex GUID (also accepts the dashed 36-character form).

```abap
DATA(lv_ok) = zabaputil_cl_util=>check_is_guid( lv_uuid ).
```

## `check_max_length`

Returns `abap_true` when the value fits into `max` characters.

```abap
DATA(lv_ok) = zabaputil_cl_util=>check_max_length( val = lv_name max = 40 ).
```

## `c_is_blank`

Returns `abap_true` for empty or whitespace-only values — documented with the other string helpers, but it belongs in every validation toolbox.

```abap
IF zabaputil_cl_util=>c_is_blank( lv_input ) = abap_true.
  " nothing entered
ENDIF.
```

## See also

- [Strings](./strings) — trimming, padding, truncating
- [Data Compare & Access](./data) — deep equality and diffs
