# Data Compare & Access

Deep comparison, field-level diffs and reading/writing nested fields by a runtime path.

## `data_equals`

Deep equality for any two values — structures, tables, elementary types.

```abap
IF zabaputil_cl_util_context=>data_equals( a = ls_before b = ls_after ) = abap_false.
  " something changed
ENDIF.
```

## `data_diff`

Compares two structures field by field and returns the changed fields with old and new value.

```abap
DATA(lt_diff) = zabaputil_cl_util_context=>data_diff(
    old = ls_before
    new = ls_after ).
" => [(fieldname='PRICE' old_value='100' new_value='120'), ...]
```

Return type is `zabaputil_cl_util_context=>ty_t_field_diff`.

## `data_get_by_path`

Reads a nested field by a dash-separated path (case-insensitive). Returns the value as `string`; an invalid path yields an empty string instead of a dump.

```abap
DATA(lv_city) = zabaputil_cl_util_context=>data_get_by_path(
    data = ls_order
    path = `customer-address-city` ).
```

## `data_set_by_path`

Writes a nested field by the same path syntax.

```abap
zabaputil_cl_util_context=>data_set_by_path(
    EXPORTING path  = `customer-address-city`
              value = `Berlin`
    CHANGING  data  = ls_order ).
```

## See also

- [RTTI](./rtti) — inspect the shape of a value at runtime
- [Internal Tables](./itab) — dynamic sorting, slicing and counting
