# Calendar & Workdays

Weekday checks and workday arithmetic. Weekday numbering follows ISO: **1 = Monday … 7 = Sunday**.

The `calendar_id` parameter is optional everywhere: without it, "workday" simply means Monday–Friday. Pass a factory calendar ID to respect public holidays (Standard ABAP).

## `cal_get_weekday`

```abap
DATA(lv_wd) = zabaputil_cl_util=>cal_get_weekday( sy-datum ). " 1 = Monday ... 7 = Sunday
```

## `cal_is_weekend`

```abap
IF zabaputil_cl_util=>cal_is_weekend( sy-datum ) = abap_true.
  " Saturday or Sunday
ENDIF.
```

## `cal_is_workday`

```abap
DATA(lv_work) = zabaputil_cl_util=>cal_is_workday( sy-datum ).

" With a factory calendar (holidays considered)
DATA(lv_work_de) = zabaputil_cl_util=>cal_is_workday(
    date        = sy-datum
    calendar_id = '01' ).
```

## `cal_add_workdays`

Adds (or with a negative count, subtracts) N workdays to a date — weekends are skipped.

```abap
DATA(lv_due) = zabaputil_cl_util=>cal_add_workdays(
    date = sy-datum
    days = 5 ).
```

## `cal_count_workdays`

Counts the workdays between two dates (inclusive).

```abap
DATA(lv_days) = zabaputil_cl_util=>cal_count_workdays(
    date_from = lv_start
    date_to   = lv_end ).
```

## See also

- [Time & Date](./time) — timestamps and the stopwatch helper
