# Context

Helpers around the current execution context — user, tenant, callstack, system fields, runtime kind.

## `context_get_user_tech`

Returns the technical user name (works on cloud and on-prem).

```abap
DATA(lv_user) = zabaputil_cl_util=>context_get_user_tech( ). " => 'DEVELOPER'
```

## `context_get_tenant`

Returns the current tenant identifier (cloud) or client (on-prem).

```abap
DATA(lv_tenant) = zabaputil_cl_util=>context_get_tenant( ).
```

## `context_check_abap_cloud`

Returns `abap_true` when running inside an ABAP Cloud tenant.

```abap
IF zabaputil_cl_util=>context_check_abap_cloud( ) = abap_true.
  " ...
ENDIF.
```

## `context_get_sy`

Returns a typed snapshot of the current `SY` structure (`zabaputil_cl_util_api=>ty_syst`). Useful when you want to log or serialize the system context.

```abap
DATA(ls_sy) = zabaputil_cl_util=>context_get_sy( ).
```

## `context_get_callstack`

Returns the current ABAP callstack as a flat table:

```abap
TYPES: BEGIN OF ty_s_stack,
         class   TYPE string,
         include TYPE string,
         method  TYPE string,
         line    TYPE string,
       END OF ty_s_stack.
```

```abap
DATA(lt_stack) = zabaputil_cl_util=>context_get_callstack( ).
```

## BAL Helpers

The façade also exposes two BAL convenience methods that are used by the [Logging](./logging) class. They live on `zabaputil_cl_util_api`:

| Method | Purpose |
| --- | --- |
| `bal_save( object subobject id t_log )` | Persist a `ty_t_msg` to BAL |
| `bal_read( object subobject id )` | Read a `ty_t_msg` from BAL |

Use them via `zabaputil_cl_util_log` (recommended) or directly when you don't need an in-memory log instance.
