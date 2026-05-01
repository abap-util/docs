# HTTP Handler

`zabaputil_cl_util_http` is a thin wrapper that exposes one set of methods regardless of whether the underlying request is a classic on-premise HTTP server (`if_http_server`) or an ABAP Cloud HTTP service (`if_web_http_*`).

## Type Reference

```abap
TYPES: BEGIN OF ty_s_http_req,
         method   TYPE string,
         body     TYPE string,
         path     TYPE string,
         t_params TYPE zabaputil_cl_util=>ty_t_name_value,
       END OF ty_s_http_req.
```

## Factories

### `factory` (on-premise)

```abap
DATA(lo_http) = zabaputil_cl_util_http=>factory( server = lo_server ).
```

`lo_server` should reference the SICF handler's `IF_HTTP_SERVER` instance (the one your `if_http_extension~handle_request` receives).

### `factory_cloud` (ABAP Cloud)

```abap
DATA(lo_http) = zabaputil_cl_util_http=>factory_cloud(
    req = lo_req
    res = lo_res ).
```

Pass the request and response objects you receive in `if_http_service_extension~handle_request`.

## Reading the Request

| Method | Returns |
| --- | --- |
| `get_req_info( )` | `ty_s_http_req` (method + body + path + parsed query) |
| `get_method( )` | `'GET' / 'POST' / ...` |
| `get_cdata( )` | Request body as `string` |
| `get_header_field( val )` | The named header value |

```abap
DATA(ls_req) = lo_http->get_req_info( ).
DATA(lv_ct)  = lo_http->get_header_field( 'Content-Type' ).
```

## Writing the Response

| Method | Effect |
| --- | --- |
| `set_cdata( val )` | Set the response body (string) |
| `set_status( code reason )` | Set the HTTP status code and reason phrase |
| `set_header_field( n v )` | Add or replace a response header |
| `set_session_stateful( val )` | Toggle stateful session (no-op on cloud) |

```abap
lo_http->set_cdata( '{"ok":true}' ).
lo_http->set_header_field( n = 'Content-Type' v = 'application/json' ).
lo_http->set_status( code = 200 reason = 'OK' ).
```

## Cookies

| Method | Cloud | On-Premise |
| --- | --- | --- |
| `get_response_cookie( val )` | No-op | Reads the cookie via `IF_HTTP_RESPONSE` |
| `delete_response_cookie( val )` | No-op | Deletes the cookie via `IF_HTTP_RESPONSE` |

Cookie management is currently on-prem only — see [Cloud vs. On-Premise](/guide/cloud-vs-onprem) for details.

## Worked Example — Cloud handler

```abap
CLASS zcl_my_http_service DEFINITION
  PUBLIC INHERITING FROM cl_rest_resource FINAL.
  PUBLIC SECTION.
    INTERFACES if_http_service_extension.
ENDCLASS.

CLASS zcl_my_http_service IMPLEMENTATION.
  METHOD if_http_service_extension~handle_request.

    DATA(lo_http) = zabaputil_cl_util_http=>factory_cloud(
        req = request
        res = response ).

    DATA(ls_req) = lo_http->get_req_info( ).

    " ... do work ...

    lo_http->set_cdata( zabaputil_cl_util=>json_stringify( ls_result ) ).
    lo_http->set_header_field( n = 'Content-Type' v = 'application/json' ).
    lo_http->set_status( code = 200 reason = 'OK' ).

  ENDMETHOD.
ENDCLASS.
```
