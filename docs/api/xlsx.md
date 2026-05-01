# XLSX / Excel

Round-trip an internal table to an `xstring` containing a real Office Open XML (`.xlsx`) workbook.

## `conv_get_xlsx_by_itab`

```abap
DATA(lv_xlsx) = zabaputil_cl_util=>conv_get_xlsx_by_itab( lt_flights ).
```

`lv_xlsx` is an `xstring`. Stream it back to the client via your HTTP response or hand it to a download helper.

## `conv_get_itab_by_xlsx`

```abap
DATA lr_data TYPE REF TO data.
zabaputil_cl_util=>conv_get_itab_by_xlsx(
    EXPORTING val    = lv_xlsx
    IMPORTING result = lr_data ).

ASSIGN lr_data->* TO FIELD-SYMBOL(<lt_data>).
```

The result type is inferred from the workbook structure.

## Streaming a download

```abap
DATA(lv_xlsx) = zabaputil_cl_util=>conv_get_xlsx_by_itab( lt_flights ).

lo_http->set_header_field( n = 'Content-Type'
                           v = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ).
lo_http->set_header_field( n = 'Content-Disposition'
                           v = 'attachment; filename="flights.xlsx"' ).
lo_http->set_cdata( zabaputil_cl_util=>conv_encode_x_base64( lv_xlsx ) ).
```

(Adjust `set_cdata` vs. a binary setter depending on your transport — the snippet above shows the Base64 path used by some Fiori frontends.)

## See also

- [Logging → `to_xlsx`](./logging#to-xlsx) — convenience wrapper that exports the log as XLSX
- [CSV](./csv) — text-based alternative
