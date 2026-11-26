# MIME Repository, Spool & Forms

Read and write files of the MIME repository, get spool requests and Adobe forms as PDF, and turn binary tables back into an `xstring`.

| Method | Parameters | Returns | Standard ABAP only |
| --- | --- | --- | --- |
| `mime_read` | `url` | `xstring` | ✔ |
| `mime_save` | `url`, `content`, `package` (default `$TMP`), `transport` (optional) | — | ✔ |
| `spool_get_pdf` | `spool_id` (`i`) | `xstring` | ✔ |
| `form_get_pdf` | `form_name`, `data` (optional), `langu` (default `sy-langu`) | `xstring` | ✔ |
| `conv_get_xstring_by_bintab` | `val` (standard table), `length` (optional) | `xstring` | |

::: warning Standard ABAP only
`mime_read`, `mime_save`, `spool_get_pdf` and `form_get_pdf` raise `zabaputil_cx_util_error` on ABAP Cloud. `conv_get_xstring_by_bintab` works everywhere.
:::

## `mime_read`

Reads a file of the MIME repository.

```abap
DATA(lv_logo) = zabaputil_cl_util_context=>mime_read( `/SAP/PUBLIC/ZMY_APP/logo.png` ).
```

## `mime_save`

Creates or replaces a file in the MIME repository. A new file is created in `package` (default `$TMP`); outside local packages pass a `transport` request.

```abap
zabaputil_cl_util_context=>mime_save( url     = `/SAP/PUBLIC/ZMY_APP/logo.png`
                                      content = lv_logo ).

zabaputil_cl_util_context=>mime_save( url       = `/SAP/PUBLIC/ZMY_APP/logo.png`
                                      content   = lv_logo
                                      package   = `ZMY_APP`
                                      transport = `DEVK900123` ).
```

## `spool_get_pdf`

Returns a spool request as PDF — SAPscript and Smart Forms (OTF), ABAP lists and Adobe forms (ADS). Raises `zabaputil_cx_util_error` if the spool request does not exist.

```abap
DATA(lv_pdf) = zabaputil_cl_util_context=>spool_get_pdf( lv_spool_id ).
```

## `form_get_pdf`

Renders an Adobe form (PDF-based print form, transaction `SFP`) to PDF. The components of `data` are passed to the form interface parameters of the same name.

```abap
" one component per form interface parameter
DATA: BEGIN OF ls_form_data,
        is_header TYPE zmy_s_header,
        it_items  TYPE zmy_t_items,
      END OF ls_form_data.

DATA(lv_pdf) = zabaputil_cl_util_context=>form_get_pdf( form_name = `ZMY_FORM`
                                                        data      = ls_form_data ).
```

## `conv_get_xstring_by_bintab`

The bytes of a binary table (`SOLIX`, `BAPICONTEN`, `W3MIME`, `TLINE` holding raw bytes, …) as one `xstring` — the inverse of `conv_get_bintab_by_xstring`. `length` is the number of bytes to keep; by default all lines are taken in full.

```abap
DATA(lv_x) = zabaputil_cl_util_context=>conv_get_xstring_by_bintab( val    = lt_solix
                                                                    length = lv_size ).
```

## See also

- [Attachments (GOS)](./gos) — attach the PDF to a business object
- [System Utilities](./system) — `mail_send`
- [Conversion & Encoding](./conversion) — string ↔ xstring, Base64
