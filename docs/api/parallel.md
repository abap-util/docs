# Parallel Processing

Run tasks in parallel sessions with one method call. `parallel_run` wraps `CL_ABAP_PARALLEL` (method `RUN_INST`), which is available on **ABAP Cloud and newer Standard ABAP releases**. Where the class is missing, the tasks run one after the other in the current session — the calling code stays the same.

## Signature

```abap
CLASS-METHODS parallel_run
  IMPORTING
    t_task        TYPE ty_t_object                       " table of REF TO object
    tasks         TYPE i         DEFAULT 0               " max. parallel tasks, 0 = system default
    timeout       TYPE i         DEFAULT 0               " seconds, 0 = system default
    sequential    TYPE abap_bool DEFAULT abap_false      " abap_true: run in this session
    method        TYPE clike     DEFAULT `IF_ABAP_PARALLEL~DO`
  RETURNING
    VALUE(result) TYPE ty_t_parallel.
```

Every row of the result (`ty_s_parallel`):

| Component | Type | Meaning |
| --- | --- | --- |
| `index` | `i` | Position of the task in `t_task` |
| `task` | `REF TO object` | The task after it ran — in parallel mode the copy that came back from the parallel session, holding the results it set |
| `message` | `string` | Error text if the task failed, initial otherwise |

## Writing a task

A task is an object implementing `IF_ABAP_PARALLEL` (method `DO`). Its attributes carry the input and the result: the object is serialized into a parallel session, runs `DO` there and comes back with its attributes filled.

```abap
CLASS zcl_my_task DEFINITION PUBLIC FINAL CREATE PUBLIC.
  PUBLIC SECTION.
    INTERFACES if_abap_parallel.
    DATA mv_input  TYPE string.
    DATA mv_result TYPE string.
ENDCLASS.

CLASS zcl_my_task IMPLEMENTATION.
  METHOD if_abap_parallel~do.
    mv_result = |processed { mv_input }|.
  ENDMETHOD.
ENDCLASS.
```

## Running tasks

```abap
DATA(lt_tasks) = VALUE zabaputil_cl_util_context=>ty_t_object(
    ( NEW zcl_my_task( ) )
    ( NEW zcl_my_task( ) ) ).
" ... set mv_input of each task ...

DATA(lt_result) = zabaputil_cl_util_context=>parallel_run( t_task = lt_tasks  tasks = 4 ).

LOOP AT lt_result INTO DATA(ls_result).
  IF ls_result-message IS NOT INITIAL.
    " the task failed
    CONTINUE.
  ENDIF.
  DATA(lo_task) = CAST zcl_my_task( ls_result-task ).  " the copy that ran, with its results
  DATA(lv_out)  = lo_task->mv_result.
ENDLOOP.
```

::: warning Read the results from the result table
In parallel mode the objects in `t_task` are **not** changed — the parallel session works on a serialized copy. Always read the results from `ls_result-task`.
:::

## Sequential mode

With `sequential = abap_true` the tasks run one after the other in the current session, calling `method` on each task. Use it for debugging, or to run the same task classes on a release without `CL_ABAP_PARALLEL` — which `parallel_run` also detects on its own and then falls back to the sequential mode automatically.

```abap
lt_result = zabaputil_cl_util_context=>parallel_run( t_task     = lt_tasks
                                                     sequential = abap_true
                                                     method     = `RUN` ).
```

In sequential mode an exception of a task is caught and its text returned in `message`. An error of the parallel framework itself raises `zabaputil_cx_util_error`.

## See also

- [System Utilities](./system) — `job_submit_report` for background processing
- [Errors & Exceptions](./errors) — `zabaputil_cx_util_error`
