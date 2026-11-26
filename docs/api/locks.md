# Locks (Enqueue)

Wrappers around the SAP enqueue service: set, check and release locks by lock object name, plus utilities to inspect and clean up lock entries.

All `*_set` / `*_delete` / `*_is_locked` / `*_get_owner` methods take the **lock object name** (e.g. a `E_...`/`EZ...` enqueue object) as `val` and an optional parameter table `t_param` (`zabaputil_cl_util_context=>ty_t_lock_param`, name/value pairs for the lock arguments).

## `lock_set`

Sets a lock. Returns `abap_true` on success, `abap_false` when the lock is already held.

```abap
DATA(lv_locked) = zabaputil_cl_util_context=>lock_set(
    val     = `EZ_MY_LOCK`
    t_param = VALUE #( ( name = 'ORDER_ID' value = lv_order_id ) ) ).
```

## `lock_set_wait`

Like `lock_set`, but retries until the lock is available — useful when short-lived collisions are expected.

```abap
DATA(lv_locked) = zabaputil_cl_util_context=>lock_set_wait(
    val      = `EZ_MY_LOCK`
    retries  = 10       " default 5
    delay_ms = 200 ).   " default 500
```

## `lock_is_locked` / `lock_get_owner`

```abap
IF zabaputil_cl_util_context=>lock_is_locked( `EZ_MY_LOCK` ) = abap_true.
  DATA(lv_owner) = zabaputil_cl_util_context=>lock_get_owner( `EZ_MY_LOCK` ).
  " tell the user who holds the lock
ENDIF.
```

## `lock_delete`

Releases a lock previously set with `lock_set`.

```abap
zabaputil_cl_util_context=>lock_delete( `EZ_MY_LOCK` ).
```

## `lock_read`

Reads current lock entries, optionally filtered by lock object, user or client. Returns `zabaputil_cl_util_context=>ty_t_lock` (object, argument, user, mode, date/time, owner).

```abap
DATA(lt_locks) = zabaputil_cl_util_context=>lock_read( user = sy-uname ).
```

## `lock_delete_entries`

Deletes lock entries previously read with `lock_read` — administrative cleanup.

```abap
DATA(lt_stale) = zabaputil_cl_util_context=>lock_read( lock_object = `EZ_MY_LOCK` ).
zabaputil_cl_util_context=>lock_delete_entries( lt_stale ).
```

::: warning
Deleting foreign lock entries bypasses the owner's transaction logic — reserve this for admin/cleanup scenarios.
:::

## `lock_get_dequeue_by_enqueue`

Derives the matching `DEQUEUE_*` function name from an `ENQUEUE_*` name.

```abap
DATA(lv_deq) = zabaputil_cl_util_context=>lock_get_dequeue_by_enqueue( `ENQUEUE_EZ_MY_LOCK` ).
" => 'DEQUEUE_EZ_MY_LOCK'
```
