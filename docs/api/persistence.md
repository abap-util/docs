# Persistence

`zabaputil_cl_util_db` is a tiny key/value store on top of the table `ZABAPUTIL_T_91`. Use it for things like saving filter selections, layout snapshots or small per-user state without designing a custom table.

::: tip Cloud caveat
The `ZABAPUTIL_T_91` table is part of the on-premise / Standard ABAP package. ABAP Cloud projects should prefer their dedicated persistence patterns (RAP behavior implementations, BOPF, etc.).
:::

## Concept

A row is identified by **four** key columns: `uname`, `handle`, `handle2`, `handle3`. A unique `id` (UUID) is generated automatically. The `data` column stores the value as **S-RTTI XML** — that means you get round-trippable persistence for any ABAP type, not just flat structures.

## `save`

Persist any ABAP value under the given handle. Returns the row id.

```abap
DATA(lv_id) = zabaputil_cl_util_db=>save(
    uname  = sy-uname
    handle = 'FILTER'
    data   = ls_filter ).
```

If a row for the handle already exists it is **updated** in place; otherwise a new row is inserted.

| Parameter | Default | Notes |
| --- | --- | --- |
| `uname` / `handle` / `handle2` / `handle3` | `OPTIONAL` | Composite key — pick the parts you need |
| `data` | required | Any ABAP value |
| `check_commit` | `abap_true` | When `abap_true`, commits the work synchronously |

## `load_by_handle`

Reload a value by the same composite handle. Raises `zabaputil_cx_util_error` (`NO_ENTRY_FOR_HANDLE_EXISTS`) if not found.

```abap
DATA ls_filter LIKE ls_search.
zabaputil_cl_util_db=>load_by_handle(
    EXPORTING uname  = sy-uname
              handle = 'FILTER'
    IMPORTING result = ls_filter ).
```

## `load_by_id`

Reload by the technical row id (returned by `save`).

```abap
DATA ls_filter LIKE ls_search.
zabaputil_cl_util_db=>load_by_id(
    EXPORTING id     = lv_id
    IMPORTING result = ls_filter ).
```

## `delete_by_handle`

Delete the row(s) matching the handle.

```abap
zabaputil_cl_util_db=>delete_by_handle(
    uname  = sy-uname
    handle = 'FILTER' ).
```

`check_commit` defaults to `abap_true`; pass `abap_false` if you want to bundle the delete into a larger LUW.

## See also

- [`xml_srtti_stringify` / `xml_srtti_parse`](./xml#xml-srtti-stringify) — the engine that powers the `data` column
