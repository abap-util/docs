# Messages

A unified extractor that accepts almost anything carrying SAP message data (single structures, internal tables, exception objects, BAL containers, BAPIRET tables, …) and returns a flat `ty_t_msg`.

## Type Reference

```abap
TYPES: BEGIN OF ty_s_msg,
         text       TYPE string,
         id         TYPE string,
         no         TYPE string,
         type       TYPE string,
         v1         TYPE string,
         v2         TYPE string,
         v3         TYPE string,
         v4         TYPE string,
         timestampl TYPE timestampl,
         t_meta     TYPE ty_t_name_value,
       END OF ty_s_msg,
       ty_t_msg TYPE STANDARD TABLE OF ty_s_msg WITH EMPTY KEY.
```

## `msg_get`

Extract a **single** message structure from any input.

```abap
DATA(ls_msg) = zabaputil_cl_util_context=>msg_get( ls_bapiret ).
```

## `msg_get_t`

Extract **all** messages as a table. The most useful entry point — works for:

- structures with `MSGID` / `MSGNO` / `MSGV1..4` (e.g. `BAPIRET2`)
- internal tables of such structures
- references to `cx_root` (any exception)
- references to `if_bali_log` (BAL log containers)
- references implementing `ZIF_LOGGER` (the popular logger interface)

```abap
DATA(lt_msg) = zabaputil_cl_util_context=>msg_get_t( lo_bali ).
```

## `msg_get_by_msg`

Build one `ty_s_msg` from raw message components. Optional placeholders `v1..v4` are passed through to `MESSAGE` so the text comes back resolved.

```abap
DATA(ls_msg) = zabaputil_cl_util_context=>msg_get_by_msg(
    id = '00'
    no = '398'
    v1 = 'Hello'
    v2 = 'World' ).
```

## Companion class `zabaputil_cl_util_msg`

Lower-level helpers used by the façade. Useful when you need to extract messages from custom containers:

| Method | Purpose |
| --- | --- |
| `msg_get_text( val )` | Returns the text of the first message in `val` |
| `msg_map( name val is_msg )` | Maps a single component into the right slot of `ty_s_msg` |
| `msg_get( val )` | Recursive extractor (called by the façade `msg_get_t`) |
| `msg_get_by_sy( )` | Build a `ty_t_msg` from the current `sy-msg*` fields |

### Recognized component names

`msg_map` maps a component of the input structure by its name. The following names are recognized, so the common SAP message structures (`BAPIRET2`, `BAPIRETURN`, `SYST`, `BALM`, `MESG`, …) work without any mapping:

| `ty_s_msg` field | Component names |
| --- | --- |
| `id` | `ID`, `MSGID`, `ARBGB` |
| `no` | `NO`, `NUMBER`, `MSGNO`, `TXTNR` |
| `text` | `MESSAGE`, `TEXT` |
| `type` | `TYPE`, `MSGTY`, `M_SEVERITY` |
| `v1` … `v4` | `MESSAGE_V1` … `MESSAGE_V4`, `MSGV1` … `MSGV4`, `V1` … `V4` |
| `timestampl` | `TIME_STMP` |

`ARBGB` and `TXTNR` are the message class and number of the `MESG` tables (e.g. the message log of `MESSAGES_GIVE`), so such a table can be passed to `msg_get_t` as-is.

## See also

- [Logging](./logging) — collect messages over time
- [Errors & Exceptions](./errors) — interplay with `zabaputil_cx_util_error`
