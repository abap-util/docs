# Time & Date

Helpers for working with `timestampl` (long timestamps) and date/time pairs without falling back to `CL_ABAP_TSTMP` or `CONVERT TIME STAMP` boilerplate.

## `time_get_timestampl`

Returns the current long timestamp.

```abap
DATA(lv_now) = zabaputil_cl_util=>time_get_timestampl( ).
```

## `time_add_seconds`

Adds N seconds to a timestamp.

```abap
DATA(lv_later) = zabaputil_cl_util=>time_add_seconds(
    time    = lv_now
    seconds = 60 ).
```

## `time_subtract_seconds`

Subtracts N seconds from a timestamp.

```abap
DATA(lv_hour_ago) = zabaputil_cl_util=>time_subtract_seconds(
    time    = lv_now
    seconds = 3600 ).
```

## `time_diff_seconds`

Returns the difference between two timestamps as integer seconds.

```abap
DATA(lv_dt) = zabaputil_cl_util=>time_diff_seconds(
    time_from = lv_start
    time_to   = lv_end ).
```

## `time_get_date_by_stampl`

Extracts the date part of a long timestamp.

```abap
DATA(lv_date) = zabaputil_cl_util=>time_get_date_by_stampl( lv_now ).
```

## `time_get_time_by_stampl`

Extracts the time part of a long timestamp.

```abap
DATA(lv_time) = zabaputil_cl_util=>time_get_time_by_stampl( lv_now ).
```

## `time_get_stampl_by_date_time`

Combines a date and a time into a long timestamp.

```abap
DATA(lv_ts) = zabaputil_cl_util=>time_get_stampl_by_date_time(
    date = sy-datum
    time = sy-uzeit ).
```
