# Logging

`zabaputil_cl_util_log` is a fluent log builder that aggregates messages and exposes them in several formats.

## Create a log

```abap
DATA(lo_log) = NEW zabaputil_cl_util_log( ).
```

## Append messages

Each setter returns `me` so the calls chain:

```abap
lo_log->info(    `Started import` )
       ->success( `Imported 100 records` )
       ->warning( `Skipped 3 invalid rows` )
       ->error(   `Failed to commit` ).
```

| Method | Type code |
| --- | --- |
| `info( val )` | `I` |
| `success( val )` | `S` |
| `warning( val )` | `W` |
| `error( val )` | `E` |

## `add( val )`

A polymorphic appender that delegates to [`msg_get_t`](./messages#msg-get-t) — pass an exception, a `BAPIRET2`, an internal table, a BAL log, … and it appends every contained message.

```abap
TRY.
    " ...
  CATCH cx_root INTO DATA(lx).
    lo_log->add( lx ).
ENDTRY.
```

## Inspection

| Method | Returns |
| --- | --- |
| `count( )` | Number of entries (integer) |
| `has_error( )` | `abap_true` if any entry is of type `E` |

## Export

| Method | Format |
| --- | --- |
| `to_msg( )` | `ty_t_msg` table |
| `to_csv( )` | CSV string |
| `to_xlsx( )` | XLSX `xstring` |
| `to_string( )` | One newline-separated string with `[type] text` lines |

## Persistence (BAL)

Two convenience methods round-trip the entire log to/from the SAP Business Application Log (`BAL`):

```abap
" Save the in-memory log
lo_log->bal_save(
    object    = 'ZMY_OBJ'
    subobject = 'ZMY_SUB'
    id        = 'JOB_42' ).

" Reload it later
DATA(lo_log2) = NEW zabaputil_cl_util_log( ).
lo_log2->bal_read(
    object    = 'ZMY_OBJ'
    subobject = 'ZMY_SUB'
    id        = 'JOB_42' ).
```

`bal_*` is implemented on top of [`zabaputil_cl_util_api=>bal_save`](./context) / `bal_read` so it works on cloud and on-prem.

## Clearing

```abap
lo_log->clear( ).
```
