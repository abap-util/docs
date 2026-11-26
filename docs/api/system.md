# System Utilities

Authorization checks, number ranges, change documents, background jobs and e-mail.

## `auth_check`

Wraps `AUTHORITY-CHECK` in a single call. `activity` defaults to `'03'` (display).

```abap
IF zabaputil_cl_util_context=>auth_check(
     object   = `S_TCODE`
     field    = `TCD`
     value    = `SE38` ) = abap_false.
  " no authorization
ENDIF.
```

## `numrange_get_next`

Draws the next number from a number range object (`subobject` defaults to `01`).

```abap
DATA(lv_number) = zabaputil_cl_util_context=>numrange_get_next( object = `ZMY_NR` ).
```

## `changdoc_read`

Reads change documents (CDHDR/CDPOS) for an object class and ID, flattened to one row per changed field.

```abap
DATA(lt_changes) = zabaputil_cl_util_context=>changdoc_read(
    objectclass = `ZMY_OBJECT`
    objectid    = lv_object_id
    date_from   = lv_since ).
" => [(changenr username udate utime tcode fieldname old_value new_value tabname chngind), ...]
```

## `job_submit_report`

Submits a report as a background job (`JOB_OPEN` / `JOB_SUBMIT` / `JOB_CLOSE`) and returns the job name.

```abap
DATA(lv_job) = zabaputil_cl_util_context=>job_submit_report(
    report  = `ZMY_REPORT`
    variant = `DEFAULT` ).
```

::: warning ABAP Cloud
On ABAP Cloud this method raises `zabaputil_cx_util_error` — Application Jobs require a registered job catalog entry there; use `CL_APJ_RT_API` instead.
:::

## `mail_send`

Sends an e-mail via BCS — on ABAP Cloud through `CL_BCS_MAIL_MESSAGE`, on-premise through classic BCS. Set `html = abap_true` for an HTML body.

```abap
zabaputil_cl_util_context=>mail_send(
    to      = `mail@example.com`
    subject = `Import finished`
    body    = `<h1>Done!</h1>`
    html    = abap_true ).
```

Returns `abap_true` when the mail was handed over successfully.

## See also

- [Context](./context) — current user, tenant, cloud detection
- [Transport Requests](./transport) — CTS helpers
