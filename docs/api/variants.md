# Report Variants

List the variants of a report and read their values.

::: warning Standard ABAP only
Both methods raise `zabaputil_cx_util_error` on ABAP Cloud.
:::

| Method | Parameters | Returns |
| --- | --- | --- |
| `variant_list` | `report`, `langu` (default `sy-langu`) | `ty_t_variant` |
| `variant_read` | `report`, `variant` | `ty_t_variant_value` |

## `variant_list`

The variants of a report (tables `VARID`/`VARIT`) with their texts in `langu`.

| Component | Meaning |
| --- | --- |
| `variant` | Variant name |
| `text` | Variant text |

```abap
DATA(lt_variants) = zabaputil_cl_util_context=>variant_list( `ZMY_REPORT` ).
```

## `variant_read`

The values of a report variant (`RS_VARIANT_CONTENTS`), one row per parameter value or select-option line.

| Component | Meaning |
| --- | --- |
| `selname` | Name of the parameter or select-option |
| `kind` | `P` parameter, `S` select-option |
| `sign` | `I` / `E` |
| `option` | `EQ`, `BT`, `CP`, … |
| `low` | Value, or lower bound |
| `high` | Upper bound |

```abap
DATA(lt_values) = zabaputil_cl_util_context=>variant_read( report  = `ZMY_REPORT`
                                                           variant = `DEFAULT` ).
```

## See also

- [System Utilities](./system) — `job_submit_report` runs a report with a variant in the background
