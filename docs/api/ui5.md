# UI5 Messages

Helpers that bridge ABAP message types and the SAPUI5 message-strip / message-box vocabulary.

## Constants

```abap
CONSTANTS:
  BEGIN OF cs_ui5_msg_type,
    e TYPE string VALUE `Error`,
    s TYPE string VALUE `Success`,
    w TYPE string VALUE `Warning`,
    i TYPE string VALUE `Information`,
  END OF cs_ui5_msg_type.
```

## `ui5_get_msg_type`

Translate a single character (`'E'`, `'S'`, `'W'`, `'I'`) into the matching UI5 enum value.

```abap
DATA(lv) = zabaputil_cl_util=>ui5_get_msg_type( 'E' ). " => 'Error'
```

## `ui5_msg_box_format`

Build a message-box payload directly from any value (structure, exception, …). Returns:

```abap
TYPES: BEGIN OF ty_s_msg_box,
         text    TYPE string,
         type    TYPE string,
         title   TYPE string,
         details TYPE string,
         skip    TYPE abap_bool,
       END OF ty_s_msg_box.
```

```abap
DATA(ls_box) = zabaputil_cl_util=>ui5_msg_box_format( lx_error ).
```

The result is shaped to drop straight into a UI5 `MessageBox.show( ... )` call.
