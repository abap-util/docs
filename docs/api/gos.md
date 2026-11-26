# Attachments (GOS)

Attach files to business objects and read them back — the attachment list of the Generic Object Services (GOS).

::: warning Standard ABAP only
All three methods raise `zabaputil_cx_util_error` on ABAP Cloud.
:::

| Method | Parameters | Returns |
| --- | --- | --- |
| `gos_attach` | `object_type`, `object_key`, `file_name`, `content`, `description` (optional) | `string` (document ID) |
| `gos_list` | `object_type`, `object_key` | `ty_t_gos` |
| `gos_read` | `doc_id` | `xstring` |

## `gos_attach`

Attaches a file to a business object, e.g. object type `BUS2012` with a purchase order number. The file extension of `file_name` becomes the document type; without a `description` the file name without extension is used. The relationship is committed (`BINARY_RELATION_CREATE_COMMIT`). Returns the document ID.

```abap
DATA(lv_doc_id) = zabaputil_cl_util_context=>gos_attach( object_type = `BUS2012`
                                                         object_key  = lv_ebeln
                                                         file_name   = `offer.pdf`
                                                         content     = lv_pdf ).
```

## `gos_list`

The GOS attachments of a business object:

| Component | Type | Meaning |
| --- | --- | --- |
| `doc_id` | `string` | Document ID, input for `gos_read` |
| `file_name` | `string` | File name |
| `description` | `string` | Description |
| `file_ext` | `string` | File extension |
| `size` | `i` | Size in bytes |
| `created_by` | `string` | User who created the attachment |
| `created_on` | `d` | Creation date |

```abap
DATA(lt_files) = zabaputil_cl_util_context=>gos_list( object_type = `BUS2012`
                                                      object_key  = lv_ebeln ).
```

## `gos_read`

The content of an attachment, `doc_id` from `gos_list`.

```abap
DATA(lv_file) = zabaputil_cl_util_context=>gos_read( lt_files[ 1 ]-doc_id ).
```

## See also

- [MIME Repository, Spool & Forms](./mime) — create the PDF to attach
- [ZIP Archives](./zip) — pack several attachments into one file
