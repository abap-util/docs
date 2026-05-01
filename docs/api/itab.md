# Internal Tables

Helpers for moving rows between tables of different shapes, extracting components and applying value filters.

## `itab_corresponding`

A `MOVE-CORRESPONDING` for **tables**. Copies matching components from `val` into `tab`. Existing rows in `tab` are appended to.

```abap
zabaputil_cl_util=>itab_corresponding(
    EXPORTING val = lt_source
    CHANGING  tab = lt_target ).
```

Use this when source and target have different shapes but share component names.

## `itab_filter_by_val`

Keeps the rows of `tab` whose **first character-like component** contains `val`.

```abap
zabaputil_cl_util=>itab_filter_by_val(
    EXPORTING val = 'LH'
    CHANGING  tab = lt_flights ).
```

## `itab_filter_by_t_range`

Filters an internal table by a list of [`ty_t_filter_multi`](./filters#ty-t-filter-multi) entries.

```abap
zabaputil_cl_util=>itab_filter_by_t_range(
    EXPORTING val = lt_filter
    CHANGING  tab = lt_flights ).
```

## `itab_get_by_struc`

Returns the components of any value as a name/value table (`zabaputil_cl_util=>ty_t_name_value`). Useful when you need to render a structure dynamically.

```abap
DATA(lt_nv) = zabaputil_cl_util=>itab_get_by_struc( ls_flight ).
" => [(n='CARRID' v='LH'), (n='CONNID' v='0400'), ...]
```

## See also

- [Filters & Tokens](./filters)
- [Ranges](./ranges) — for SQL-style filtering
