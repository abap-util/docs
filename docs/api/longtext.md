# Long Texts (SAPscript)

Read, save and delete SAPscript long texts (`READ_TEXT`, `SAVE_TEXT`, `DELETE_TEXT`) as plain strings — lines separated by newline — instead of `TLINE` tables.

::: warning Standard ABAP only
`longtext_read`, `longtext_save` and `longtext_delete` need Standard ABAP; on ABAP Cloud they raise `zabaputil_cx_util_error`. The line conversion `longtext_to_lines` / `longtext_from_lines` works everywhere.
:::

## Signatures

| Method | Parameters | Returns | Standard ABAP only |
| --- | --- | --- | --- |
| `longtext_read` | `object`, `id`, `name`, `langu` (default `sy-langu`) | `string` | ✔ |
| `longtext_save` | `object`, `id`, `name`, `val`, `langu` (default `sy-langu`) | — | ✔ |
| `longtext_delete` | `object`, `id`, `name`, `langu` (default `sy-langu`) | — | ✔ |
| `longtext_to_lines` | `val` | `ty_t_longtext_line` | |
| `longtext_from_lines` | `val` (`ty_t_longtext_line`) | `string` | |

| Parameter | Meaning |
| --- | --- |
| `object` | Text object, e.g. `VBBK`, `MATERIAL` |
| `id` | Text ID, e.g. `0001`, `GRUN` |
| `name` | Text name, usually the object key |
| `langu` | SAP or ISO language |

## `longtext_read`

Returns the long text as one string. Raises `zabaputil_cx_util_error` if the text does not exist.

```abap
DATA(lv_text) = zabaputil_cl_util_context=>longtext_read( object = `VBBK`
                                                          id     = `0001`
                                                          name   = lv_vbeln ).
```

## `longtext_save`

Creates or replaces a long text. Every newline starts a new paragraph, longer lines are split at 132 characters. The text is written with the next `COMMIT WORK`.

```abap
zabaputil_cl_util_context=>longtext_save( object = `VBBK`
                                          id     = `0001`
                                          name   = lv_vbeln
                                          val    = lv_text ).
COMMIT WORK.
```

## `longtext_delete`

Deletes a long text. A missing text is no error.

```abap
zabaputil_cl_util_context=>longtext_delete( object = `VBBK`  id = `0001`  name = lv_vbeln ).
```

## `longtext_to_lines` / `longtext_from_lines`

The line format conversion on its own — useful when you call the text function modules yourself or work with texts from other sources. A line (`ty_s_longtext_line`) has two components:

| Component | Meaning |
| --- | --- |
| `format` | Paragraph format: `*` new paragraph, `/` new line, `=` continuous, initial = continuation separated by a blank |
| `line` | Up to 132 characters of text |

`longtext_to_lines` starts every newline as a paragraph (`*`); lines longer than 132 characters continue with format `=`. `longtext_from_lines` is the inverse.

```abap
DATA(lt_lines) = zabaputil_cl_util_context=>longtext_to_lines( |First paragraph\nSecond paragraph| ).
" => ( format = `*` line = `First paragraph` )
"    ( format = `*` line = `Second paragraph` )

DATA(lv_text) = zabaputil_cl_util_context=>longtext_from_lines( lt_lines ).
```

## See also

- [Texts & Domains](./texts) — T100 message texts and domain fixed values
- [Cloud vs. On-Premise](/guide/cloud-vs-onprem)
