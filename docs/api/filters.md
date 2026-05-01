# Filters & Tokens

A small DSL that bridges three common filter representations: **ABAP ranges**, **UI5 SmartFilterBar tokens** and **multi-filter structures** that can be persisted or sent over the wire.

## Type Reference

### `ty_s_range` / `ty_t_range`

Standard SAP range structure made type-safe:

```abap
TYPES: BEGIN OF ty_s_range,
         sign   TYPE c LENGTH 1,    " 'I' or 'E'
         option TYPE c LENGTH 2,    " 'EQ', 'NE', 'BT', 'CP', ...
         low    TYPE string,
         high   TYPE string,
       END OF ty_s_range.
```

### `ty_s_token` / `ty_t_token`

Mirrors a UI5 SmartFilterBar token:

```abap
TYPES: BEGIN OF ty_s_token,
         key      TYPE string,
         text     TYPE string,
         visible  TYPE abap_bool,
         selkz    TYPE abap_bool,
         editable TYPE abap_bool,
       END OF ty_s_token.
```

### `ty_s_filter_multi` / `ty_t_filter_multi`

A composite per-field structure carrying both ranges and tokens, plus deltas for the front-end:

```abap
TYPES: BEGIN OF ty_s_filter_multi,
         name            TYPE string,
         t_range         TYPE ty_t_range,
         t_token         TYPE ty_t_token,
         t_token_added   TYPE ty_t_token,
         t_token_removed TYPE ty_t_token,
       END OF ty_s_filter_multi.
```

## `filter_get_multi_by_data`

Build a `ty_t_filter_multi` from any structure: every component becomes one entry.

```abap
DATA(lt_filter) = zabaputil_cl_util=>filter_get_multi_by_data( ls_search ).
```

## `filter_get_data_by_multi`

The inverse — flatten a multi-filter back into a flat structure.

## `filter_get_range_by_token` / `filter_get_range_t_by_token_t`

Convert a single token (or a token table) into a range entry. The token text is parsed with the SAP standard pattern (`!=`, `<`, `<=`, `*…`, etc.).

```abap
DATA(ls_range) = zabaputil_cl_util=>filter_get_range_by_token( '!=ABC' ).
" => ( sign='I' option='NE' low='ABC' )
```

## `filter_get_token_t_by_range_t`

Round-trip the other direction.

## `filter_get_token_range_mapping`

Returns the operator mapping table used internally — handy for UI5 front-ends that want to render a chooser.

## `filter_update_tokens`

Compares the current filter against a snapshot and updates the `t_token_added` / `t_token_removed` deltas in place.

```abap
DATA(lt_updated) = zabaputil_cl_util=>filter_update_tokens(
    val  = lt_current
    name = 'CARRID' ).
```

## `filter_get_sql_where`

Turns a `ty_t_filter_multi` into a single SQL `WHERE` fragment. Use with [Ranges](./ranges) for full-blown dynamic SQL.

```abap
DATA(lv_where) = zabaputil_cl_util=>filter_get_sql_where( lt_filter ).
" => '( CARRID = ''LH'' ) AND ( PRICE > 100 )'
```

## `filter_get_sql_by_sql_string`

Parses a free-text SQL hint (e.g. `select * from sflight where carrid = 'LH'`) and returns a `ty_s_sql` you can plug into the [Persistence](./persistence) layer or your own dynamic SELECT.

## `filter_itab`

Apply a filter to an internal table directly:

```abap
zabaputil_cl_util=>filter_itab(
    EXPORTING filter = lt_filter
    CHANGING  val    = lt_flights ).
```
