# Errors & Exceptions

`abap-util` exposes a single exception class plus three convenience helpers. See [Error Handling](/guide/error-handling) for the design rationale.

## `zabaputil_cx_util_error`

Inherits from `cx_no_check`, so you don't need a `RAISING` clause and can ignore it where you don't want to handle it.

| Member | Meaning |
| --- | --- |
| `ms_error-x_root` | Wrapped `cx_root` exception (if any) |
| `ms_error-uuid` | A 32-char UUID, useful for log correlation |
| `ms_error-text` | Free-text message (if no exception was wrapped) |

The constructor accepts either a free-text message **or** a wrapped exception:

```abap
RAISE EXCEPTION TYPE zabaputil_cx_util_error
  EXPORTING val = `My custom message`.

" or

TRY.
    " ...
  CATCH cx_root INTO DATA(lx).
    RAISE EXCEPTION TYPE zabaputil_cx_util_error
      EXPORTING previous = lx.
ENDTRY.
```

`get_text( )` walks the entire `previous` chain and concatenates the messages with newlines.

## `x_check_raise` {#x-check-raise}

Raise the exception if `when = abap_true`. Replaces the recurring `IF sy-subrc <> 0. RAISE...` block.

```abap
SELECT SINGLE * FROM scarr WHERE carrid = @lv_id INTO @DATA(ls).
zabaputil_cl_util=>x_check_raise( when = xsdbool( sy-subrc <> 0 ) ).
```

The optional `v` parameter overrides the exception class name (defaults to `'CX_SY_SUBRC'`).

## `x_raise` {#x-raise}

Raise unconditionally with a free-text message.

```abap
zabaputil_cl_util=>x_raise( 'Something went wrong' ).
```

## `x_get_last_t100` {#x-get-last-t100}

Walks any `cx_root` chain and returns the most recent T100 message text. Useful when the chain mixes free-text exceptions and `MESSAGE INTO sy-msg*` events.

```abap
TRY.
    " ...
  CATCH cx_root INTO DATA(lx).
    DATA(lv_text) = zabaputil_cl_util=>x_get_last_t100( lx ).
ENDTRY.
```
