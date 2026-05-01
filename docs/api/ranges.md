# Ranges

`zabaputil_cl_util_range` is a SQL-aware range builder. Use it directly when you want to compose `WHERE` fragments from typed ranges, or in combination with [Filters](./filters) for the SmartFilterBar use case.

## Constants

```abap
CONSTANTS:
  BEGIN OF signs,
    including TYPE string VALUE `I`,
    excluding TYPE string VALUE `E`,
  END OF signs.

CONSTANTS:
  BEGIN OF options,
    equal                TYPE string VALUE `EQ`,
    not_equal            TYPE string VALUE `NE`,
    between              TYPE string VALUE `BT`,
    not_between          TYPE string VALUE `NB`,
    contains_pattern     TYPE string VALUE `CP`,
    not_contains_pattern TYPE string VALUE `NP`,
    greater_than         TYPE string VALUE `GT`,
    greater_equal        TYPE string VALUE `GE`,
    less_equal           TYPE string VALUE `LE`,
    less_than            TYPE string VALUE `LT`,
  END OF options.
```

## Static Range Constructors

Every operator has a single-line constructor that returns a `ty_s_range`:

| Method | Result option |
| --- | --- |
| `eq( val )` | `EQ` |
| `ne( val )` | `NE` |
| `bt( low high )` | `BT` |
| `cp( val )` | `CP` |
| `gt( val )` | `GT` |
| `ge( val )` | `GE` |
| `lt( val )` | `LT` |
| `le( val )` | `LE` |

Each method accepts an optional `sign` (defaults to `I`).

```abap
DATA(lt_range) = VALUE zabaputil_cl_util=>ty_t_range(
  ( zabaputil_cl_util_range=>eq( 'LH' ) )
  ( zabaputil_cl_util_range=>bt( low = '0001' high = '9999' ) )
  ( zabaputil_cl_util_range=>cp( 'AB*' ) ) ).
```

## Instance Builder

Bind a range table to a field name and ask for the SQL fragment:

```abap
DATA lr_range TYPE REF TO data.
GET REFERENCE OF lt_range INTO lr_range.

DATA(lo_range) = NEW zabaputil_cl_util_range(
    iv_fieldname = 'CARRID'
    ir_range     = lr_range ).

DATA(lv_sql) = lo_range->get_sql( ).
" => '( CARRID = ''LH'' OR CARRID BETWEEN ''0001'' AND ''9999'' OR CARRID LIKE ''AB%'' )'
```

The builder handles SQL escaping for you (`'` is doubled, `*` is translated to `%`).

## Combining multiple field ranges

Use `get_sql_multi` to AND-join several `WHERE` fragments:

```abap
DATA(lv_combined) = zabaputil_cl_util_range=>get_sql_multi( VALUE #(
    ( lo_carrid_range->get_sql( ) )
    ( lo_price_range->get_sql( ) ) ) ).
```

## See also

- [`filter_get_sql_where`](./filters#filter-get-sql-where) — same idea but starting from a multi-filter
