# RTTI (Runtime Type Information)

A high-level wrapper around `cl_abap_typedescr`, `cl_abap_structdescr` and friends. The helpers below cover the cases that come up over and over in framework code.

## Type Inspection

### `rtti_get_type_name`

Returns the absolute type name of any value (e.g. `'SFLIGHT'`, `'STRING'`).

```abap
DATA(lv_type) = zabaputil_cl_util=>rtti_get_type_name( ls_flight ). " => 'SFLIGHT'
```

### `rtti_get_type_kind`

Returns the type kind constant (`cl_abap_datadescr=>typekind_*`).

```abap
DATA(lv_kind) = zabaputil_cl_util=>rtti_get_type_kind( ls_data ).
```

### `rtti_check_class_exists`

```abap
IF zabaputil_cl_util=>rtti_check_class_exists( 'ZCL_FOO' ) = abap_true.
  " ...
ENDIF.
```

### `rtti_check_clike` / `rtti_check_numeric` / `rtti_check_table` / `rtti_check_structure`

Booleans for the typical "what is this value?" questions.

```abap
IF zabaputil_cl_util=>rtti_check_table( val ) = abap_true.
  " ...
ENDIF.
```

### `rtti_check_ref_data` / `rtti_check_type_kind_dref`

Detect data references.

### `rtti_check_serializable`

Returns `abap_true` if the object implements `if_serializable_object`.

## Component / Attribute Lists

### `rtti_get_t_attri_by_any`

Return the components of any structure value as a `cl_abap_structdescr=>component_table`.

```abap
DATA(lt_comp) = zabaputil_cl_util=>rtti_get_t_attri_by_any( ls_flight ).
```

### `rtti_get_t_attri_by_table_name`

Same, but starting from a DDIC table or structure name.

```abap
DATA(lt_comp) = zabaputil_cl_util=>rtti_get_t_attri_by_table_name( 'SFLIGHT' ).
```

### `rtti_get_t_attri_by_oref`

Returns `abap_attrdescr_tab` for any object reference.

### `rtti_get_t_attri_by_include`

Expand the components of a deeply nested type, flattening included structures.

## Dynamic Construction

### `rtti_create_tab_by_name`

Create a typed internal table whose row type comes from a DDIC name.

```abap
DATA(lr_tab) = zabaputil_cl_util=>rtti_create_tab_by_name( 'SFLIGHT' ).
ASSIGN lr_tab->* TO FIELD-SYMBOL(<lt>).
```

### `rtti_tab_get_relative_name`

Return the relative type name of an internal table (handy for ABAP SQL `FROM (relative)` calls).

## Reference Helpers

### `rtti_get_classname_by_ref`

Returns the runtime class name of any object reference.

### `rtti_get_intfname_by_ref`

Returns the interface name an object reference is currently typed against.

## Data Element Texts

### `rtti_get_data_element_text_l`

Returns the *long* text of a data element.

```abap
DATA(lv_label) = zabaputil_cl_util=>rtti_get_data_element_text_l( 'CARRID' ).
```

### `rtti_get_t_ddic_fixed_values`

Return the DDIC fixed values of a domain or data element with descriptions in the requested language.

```abap
DATA(lt_fix) = zabaputil_cl_util=>rtti_get_t_ddic_fixed_values(
    rollname = 'MSGTY'
    langu    = 'E' ).
```

## Bound / Initial Checks

### `check_bound_a_not_initial`

Combined `IS BOUND` + `IS NOT INITIAL` check on a `REF TO data`.

### `check_unassign_initial`

Returns `abap_true` if dereferencing the data ref yields an initial value.

### `unassign_object` / `unassign_data`

Cast any value into a `REF TO object` or `REF TO data` without writing the boilerplate.
