# CSV

CSV is supported through two symmetric helpers on the façade.

## `itab_get_csv_by_itab`

Render any internal table to a CSV string. The first row contains the column headers (uppercase component names).

```abap
DATA(lv_csv) = zabaputil_cl_util=>itab_get_csv_by_itab( lt_flights ).
```

## `itab_get_itab_by_csv`

Parse a CSV string into a freshly created internal table. The result is returned as a generic `REF TO data`.

```abap
DATA(lr_itab) = zabaputil_cl_util=>itab_get_itab_by_csv( lv_csv ).
ASSIGN lr_itab->* TO FIELD-SYMBOL(<lt>).
```

The first row of the CSV is interpreted as the header. Components are matched **by name** against the inferred line type.

## Tips

- For CSVs that need a specific encoding, combine with [`conv_get_xstring_by_string`](./conversion#conv-get-xstring-by-string) and write the bytes to file with `cl_gui_frontend_services` (on-prem) or your HTTP response object (cloud).
- For a binary format (XLSX) instead of CSV, use [`conv_get_xlsx_by_itab`](./xlsx).
