# Application Log (BAL)

Query helpers for the SAP Application Log. For **writing** logs, use the fluent [`zabaputil_cl_util_log`](./logging) builder with `bal_save`.

## `bal_search`

Searches log headers by object, subobject, external ID, date range and/or user. All filters are optional.

```abap
DATA(lt_logs) = zabaputil_cl_util_context=>bal_search(
    object    = `ZMY_APP`
    subobject = `IMPORT`
    date_from = lv_start_date ).
```

Returns `zabaputil_cl_util_context=>ty_t_bal_header` — log handle, object/subobject, external ID, date, time, user and message count per log.

## `bal_read_latest`

Reads the most recent message for an object/subobject/external-ID combination.

```abap
DATA(ls_msg) = zabaputil_cl_util_context=>bal_read_latest(
    object    = `ZMY_APP`
    subobject = `IMPORT`
    id        = `RUN_2025_01` ).
```

## `bal_read_by_type`

Reads all messages of a given type (default `E`) for a log.

```abap
DATA(lt_errors) = zabaputil_cl_util_context=>bal_read_by_type(
    object    = `ZMY_APP`
    subobject = `IMPORT`
    id        = `RUN_2025_01`
    msg_type  = `E` ).
```

## `bal_count`

Counts messages of a log without loading them.

```abap
DATA(lv_count) = zabaputil_cl_util_context=>bal_count(
    object    = `ZMY_APP`
    subobject = `IMPORT`
    id        = `RUN_2025_01` ).
```

## `bal_delete_before`

Housekeeping: deletes logs older than N days (default 30).

```abap
zabaputil_cl_util_context=>bal_delete_before(
    object = `ZMY_APP`
    days   = 90 ).
```

## See also

- [Logging](./logging) — build and persist logs (`bal_save`, `bal_read`)
- [Messages](./messages) — extract message texts from any source
