# Source & Apps

Helpers for reading source code at runtime and for building stable URLs into hosted ABAP applications.

## `source_get_method`

Returns the source code of a class method as a `string_table`. Works on cloud and on-prem; on cloud it uses `xco_cp_abap`.

```abap
DATA(lt_source) = zabaputil_cl_util=>source_get_method(
    iv_classname  = 'ZCL_FOO'
    iv_methodname = 'BAR' ).
```

## `source_get_method2`

Convenience wrapper around `source_get_method` that returns the source as a single `string`.

```abap
DATA(lv_source) = zabaputil_cl_util=>source_get_method2(
    iv_classname  = 'ZCL_FOO'
    iv_methodname = 'BAR' ).
```

## `source_method_to_file`

Renders a `string_table` of source lines into one downloadable string with proper line endings — meant to feed straight into a file/HTTP response.

```abap
DATA(lv_file) = zabaputil_cl_util=>source_method_to_file( lt_source ).
```

## `source_get_file_types`

Returns the list of file types `abap-util` recognizes when handling source code (e.g. `clas`, `intf`, `prog`, `tabl`, …).

## `app_get_url`

Build a complete URL into another ABAP-Cloud-hosted app, including HTTPS origin, path, query string and fragment.

```abap
DATA(lv_url) = zabaputil_cl_util=>app_get_url(
    classname = 'ZCL_MY_APP'
    origin    = 'https://abap.example.com'
    pathname  = '/sap/bc/ui2/flp'
    search    = 'sap-client=100'
    hash      = '#/Detail/123' ).
```

## `app_get_url_source_code`

Build a deep link to the ADT-hosted source view of a class.

```abap
DATA(lv_url) = zabaputil_cl_util=>app_get_url_source_code(
    classname = 'ZCL_MY_APP'
    origin    = 'https://abap.example.com' ).
```

Useful when generating "view source" links inside an app (a pattern made popular by [abap2UI5](https://github.com/abap2UI5/abap2UI5)).
