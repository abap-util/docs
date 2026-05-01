# Error Handling

`abap-util` exposes one exception class and a small set of helper methods to keep error handling boilerplate-free.

## The Exception Class

```abap
CLASS zabaputil_cx_util_error DEFINITION
  PUBLIC
  INHERITING FROM cx_no_check FINAL
  CREATE PUBLIC.
```

Key properties:

- **Inherits from `cx_no_check`** — you don't have to `RAISING` it in your method signatures, and you only `CATCH` it where you actually want to react.
- Carries a **uuid** (`ms_error-uuid`) so you can correlate logs and stack traces.
- The constructor accepts either a free-text message or a wrapped previous exception:

  ```abap
  RAISE EXCEPTION TYPE zabaputil_cx_util_error
    EXPORTING val = `My custom message`.

  TRY.
      " ...
    CATCH cx_root INTO DATA(lx).
      RAISE EXCEPTION TYPE zabaputil_cx_util_error
        EXPORTING previous = lx.
  ENDTRY.
  ```

- The redefined `if_message~get_text` method walks the entire `previous` chain and concatenates the messages with `cl_abap_char_utilities=>newline`, so `lx_error->get_text( )` always gives you the full story.

## Helpers on the façade

| Method | Purpose |
| --- | --- |
| [`x_check_raise( when )`](/api/errors#x-check-raise) | Raise the exception if `when = abap_true` |
| [`x_raise( v )`](/api/errors#x-raise) | Raise the exception unconditionally |
| [`x_get_last_t100( val )`](/api/errors#x-get-last-t100) | Get the most recent T100 message text from any `cx_root` |

### `x_check_raise`

Replaces the recurring `IF sy-subrc <> 0. RAISE EXCEPTION ... ENDIF.` pattern:

```abap
SELECT SINGLE * FROM scarr WHERE carrid = @lv_id INTO @DATA(ls_scarr).
zabaputil_cl_util=>x_check_raise( when = xsdbool( sy-subrc <> 0 ) ).
```

### `x_raise`

```abap
zabaputil_cl_util=>x_raise( 'Something went wrong' ).
```

### `x_get_last_t100`

Useful when your call stack is mixed with old-school `MESSAGE ... INTO sy-msg*` blocks:

```abap
TRY.
    " ...
  CATCH cx_root INTO DATA(lx).
    DATA(lv_text) = zabaputil_cl_util=>x_get_last_t100( lx ).
    " => 'Order 12345 could not be saved'
ENDTRY.
```

## Recommended Pattern

```abap
TRY.
    DATA(lo_log) = NEW zabaputil_cl_util_log( ).

    DATA(lv_json) = zabaputil_cl_util=>json_stringify( ls_data ).
    " ... do work ...

  CATCH zabaputil_cx_util_error INTO DATA(lx).
    lo_log->error( lx->get_text( ) ).
ENDTRY.
```

Because `zabaputil_cx_util_error` is unchecked, you can wrap the `TRY/CATCH` only at the boundary where you actually want to translate the failure into a log entry, an HTTP 500 or a UI5 message.
