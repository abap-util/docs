# ZIP Archives

Pack and unpack ZIP archives with a two-column file table — `name` and `content` (`xstring`).

The file table type is `zabaputil_cl_util=>ty_t_zip_file`:

| Component | Type | Meaning |
| --- | --- | --- |
| `name` | `string` | File name inside the archive (may contain `/` paths) |
| `content` | `xstring` | Raw file content |

## `zip_pack`

```abap
DATA(lv_zip) = zabaputil_cl_util=>zip_pack( VALUE #(
    ( name = `data.json`      content = lv_json_x )
    ( name = `docs/readme.txt` content = lv_text_x ) ) ).
```

Combine with [`conv_get_xstring_by_string`](./conversion#conv-get-xstring-by-string) to zip plain text:

```abap
DATA(lv_zip) = zabaputil_cl_util=>zip_pack( VALUE #(
    ( name    = `hello.txt`
      content = zabaputil_cl_util=>conv_get_xstring_by_string( `Hello World` ) ) ) ).
```

## `zip_unpack`

```abap
DATA(lt_files) = zabaputil_cl_util=>zip_unpack( lv_zip ).

LOOP AT lt_files INTO DATA(ls_file).
  DATA(lv_text) = zabaputil_cl_util=>conv_get_string_by_xstring( ls_file-content ).
ENDLOOP.
```

## See also

- [Conversion & Encoding](./conversion) — string ↔ xstring, Base64
- [XLSX / Excel](./xlsx) — spreadsheets (XLSX files are ZIP archives themselves)
