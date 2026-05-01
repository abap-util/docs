# Booleans

ABAP doesn't ship a real boolean type — you'll see `abap_bool`, `' '`/`'X'`, `0`/`1`, `'true'`/`'false'`, and so on. The boolean helpers normalize these into one consistent answer.

## `boolean_check_by_data`

Inspect any value and return `abap_true` if it represents a "truthy" value (`'X'`, `'true'`, non-zero numbers, …).

```abap
IF zabaputil_cl_util=>boolean_check_by_data( lv_input ) = abap_true.
  " ...
ENDIF.
```

## `boolean_check_by_name`

Same idea, but the input is the name of a global ABAP constant. The constant is looked up via RTTI.

```abap
IF zabaputil_cl_util=>boolean_check_by_name( 'ABAP_TRUE' ) = abap_true.
  " ...
ENDIF.
```

## `boolean_abap_2_json`

Translate an ABAP boolean-ish value into a JSON literal:

```abap
DATA(lv_a) = zabaputil_cl_util=>boolean_abap_2_json( abap_true ).  " => 'true'
DATA(lv_b) = zabaputil_cl_util=>boolean_abap_2_json( ' ' ).        " => 'false'
```
