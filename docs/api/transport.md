# Transport Requests

Read and manipulate CTS transport requests.

::: tip Availability
The transport organizer is an on-premise / Standard ABAP concept. On ABAP Cloud these helpers are limited to what the released APIs expose.
:::

## `tr_get_user_requests`

Lists the (open) transport requests of a user — defaults to the current user.

```abap
DATA(lt_requests) = zabaputil_cl_util=>tr_get_user_requests( ).
" => [(trkorr='DEVK900123' description='...' owner='...' status='...' type='...'), ...]
```

Filter by request type with the optional `request_type` parameter.

## `tr_get_objects`

Lists the object entries of a request.

```abap
DATA(lt_objects) = zabaputil_cl_util=>tr_get_objects( `DEVK900123` ).
" => [(pgmid='R3TR' object='CLAS' obj_name='ZCL_MY_CLASS'), ...]
```

## `tr_get_description` / `tr_is_released`

```abap
DATA(lv_descr)    = zabaputil_cl_util=>tr_get_description( `DEVK900123` ).
DATA(lv_released) = zabaputil_cl_util=>tr_is_released(     `DEVK900123` ).
```

## `tr_add_object`

Adds an object entry to a modifiable request.

```abap
zabaputil_cl_util=>tr_add_object(
    trkorr   = `DEVK900123`
    object   = `CLAS`          " pgmid defaults to 'R3TR'
    obj_name = `ZCL_MY_CLASS` ).
```

## Lifecycle helpers

`zabaputil_cl_util` additionally inherits transport lifecycle methods from the platform API layer: `tr_create`, `tr_release`, `tr_copy_objects`, `tr_import` and `tr_check_status`. These wrap the corresponding CTS APIs per platform.

## See also

- [Context](./context) — user, tenant and system information
