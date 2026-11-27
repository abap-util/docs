# Errors & Exceptions

`abap-util` has exactly one exception class, plus three convenience helpers on the context class. See [Error Handling](/guide/error-handling) for the design rationale.

## `zabaputil_cx_util_error`

Inherits from `cx_no_check`, so you don't need a `RAISING` clause and can ignore it where you don't want to handle it.

| Member | Meaning |
| --- | --- |
| `ms_error-x_root` | Wrapped `cx_root` exception (if any) |
| `ms_error-uuid` | A 32-char UUID for log correlation. Filled lazily — only when `get_text_full( )` renders the exception, not in the constructor |
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

If `val` is itself an exception reference and no `previous` is given, it becomes the `previous`, so the cause chain is kept either way.

### Reading the text

| Method | Kind | Returns |
| --- | --- | --- |
| `get_text( )` (`if_message~get_text`) | instance | The own text followed by the texts of the whole `previous` chain, one per line. A text that only repeats the one before it is printed once. Never empty — `UNKNOWN_ERROR` if nothing carries a text |
| `get_text_own( )` | instance | The text this exception carries itself, **without** the `previous` chain |
| `get_text_own_by_x( val )` | static | The same for any `cx_root`: the own text of a `zabaputil_cx_util_error`, the plain `get_text( )` of every other exception class |
| `get_text_full( val )` | static | The full diagnostic report of any `cx_root` — see below |

```abap
TRY.
    " ...
  CATCH cx_root INTO DATA(lx).
    DATA(lv_report) = zabaputil_cx_util_error=>get_text_full( lx ).
ENDTRY.
```

`get_text_full( )` returns three sections, each introduced by a header line:

- `--- error ---` — the concise message chain, as `get_text( )` renders it;
- `--- exception chain ---` — one block per link of the `previous` chain: the exception class, its own text, the source position it was raised at, the kernel error id, the uuid (for exceptions of this class) and every public attribute that carries a value;
- `--- context ---` — system id, release, date and time. Host, client and user are deliberately left out, because consumers show this text to end users (for example as the body of an HTTP 500).

Chain walks stop after 20 links, so a chain that points back into itself cannot loop.

## `x_check_raise` {#x-check-raise}

Raise the exception if `when = abap_true`. Replaces the recurring `IF sy-subrc <> 0. RAISE...` block.

```abap
SELECT SINGLE * FROM scarr WHERE carrid = @lv_id INTO @DATA(ls).
zabaputil_cl_util_context=>x_check_raise( when = xsdbool( sy-subrc <> 0 ) ).
```

The optional `v` parameter is the message text of the exception (defaults to `CX_SY_SUBRC`).

## `x_raise` {#x-raise}

Raise unconditionally with a free-text message.

```abap
zabaputil_cl_util_context=>x_raise( 'Something went wrong' ).
```

## `x_get_last_t100` {#x-get-last-t100}

Walks any `cx_root` chain and returns the most recent T100 message text. Useful when the chain mixes free-text exceptions and `MESSAGE INTO sy-msg*` events.

```abap
TRY.
    " ...
  CATCH cx_root INTO DATA(lx).
    DATA(lv_text) = zabaputil_cl_util_context=>x_get_last_t100( lx ).
ENDTRY.
```
