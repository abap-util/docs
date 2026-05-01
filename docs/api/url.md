# URL Parameters

Helpers for reading, building and updating query strings without touching `cl_http_utility`.

## Type

```abap
TYPES: BEGIN OF ty_s_name_value,
         n TYPE string,
         v TYPE string,
       END OF ty_s_name_value.
TYPES ty_t_name_value TYPE STANDARD TABLE OF ty_s_name_value WITH EMPTY KEY.
```

## `url_param_get`

Read a single query parameter from a URL.

```abap
DATA(lv_id) = zabaputil_cl_util=>url_param_get(
    val = 'ID'
    url = '/sap/bc/http/myapp?ID=12345&MODE=edit' ). " => '12345'
```

## `url_param_get_tab`

Return the entire query string as a name/value table.

```abap
DATA(lt_params) = zabaputil_cl_util=>url_param_get_tab( '/app?ID=1&MODE=edit' ).
" => [(n='ID' v='1'), (n='MODE' v='edit')]
```

## `url_param_create_url`

Build a URL-encoded query string from a `ty_t_name_value` table.

```abap
DATA(lv_url) = zabaputil_cl_util=>url_param_create_url(
    t_params = VALUE #(
        ( n = 'ID'   v = '12345' )
        ( n = 'MODE' v = 'edit' ) ) ). " => 'ID=12345&MODE=edit'
```

## `url_param_set`

Add or update one parameter in an existing URL.

```abap
DATA(lv_new) = zabaputil_cl_util=>url_param_set(
    url   = '/app?ID=1'
    name  = 'LANG'
    value = 'DE' ). " => '/app?ID=1&LANG=DE'
```

If `name` already exists, the value is **replaced**, not appended.
