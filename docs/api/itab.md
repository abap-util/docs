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

## `itab_sort_by`

Sorts a standard table by a field name known only at runtime.

```abap
zabaputil_cl_util=>itab_sort_by(
    EXPORTING fieldname  = 'PRICE'
              descending = abap_true
    CHANGING  tab        = lt_flights ).
```

## `itab_slice`

Returns rows `from`..`to` as a new table (data reference). `to = 0` means "to the end".

```abap
DATA(lr_top10) = zabaputil_cl_util=>itab_slice(
    tab  = lt_flights
    from = 1
    to   = 10 ).
```

## `itab_paginate`

Slices a table into pages and reports totals — built for list UIs and APIs with paging.

```abap
zabaputil_cl_util=>itab_paginate(
    EXPORTING tab         = lt_flights
              page        = 2
              page_size   = 20
    IMPORTING result      = lr_page       " REF TO data with the page rows
              total_count = lv_count
              total_pages = lv_pages ).
```

## `itab_count_by`

Counts rows grouped by a field, returned as a name/value table.

```abap
DATA(lt_counts) = zabaputil_cl_util=>itab_count_by(
    tab       = lt_flights
    fieldname = 'CARRID' ).
" => [(n='LH' v='42'), (n='AA' v='17'), ...]
```

## `itab_to_json` / `itab_from_json`

Shortcuts for serializing a table to JSON and back — same engine as [`json_stringify` / `json_parse`](./json).

```abap
DATA(lv_json) = zabaputil_cl_util=>itab_to_json( lt_flights ).

zabaputil_cl_util=>itab_from_json(
    EXPORTING val  = lv_json
    CHANGING  data = lt_flights ).
```

## See also

- [Filters & Tokens](./filters)
- [Ranges](./ranges) — for SQL-style filtering
