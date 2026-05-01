# Quick Start

A short tour through the most useful helpers. Every snippet works on every supported release.

## Strings

```abap
DATA(lv_upper) = zabaputil_cl_util=>c_trim_upper( ` Hello World  ` ). " => 'HELLO WORLD'
DATA(lv_lower) = zabaputil_cl_util=>c_trim_lower( ` Hello World  ` ). " => 'hello world'
DATA(lv_trim)  = zabaputil_cl_util=>c_trim( ` Hello World  ` ).       " => 'Hello World'

IF zabaputil_cl_util=>c_starts_with( val = 'Hello' prefix = 'He' ) = abap_true.
  " ...
ENDIF.
```

See [Strings](/api/strings) for the full list.

## JSON

```abap
" Structure → JSON
DATA(lv_json) = zabaputil_cl_util=>json_stringify( ls_flight ).
" => '{"CARRID":"LH","CONNID":"0400","FLDATE":"2025-01-15"}'

" JSON → Structure
zabaputil_cl_util=>json_parse(
    val  = lv_json
    data = ls_flight ).
```

## XML

```abap
" Any ABAP data → XML (asXML / S-RTTI)
DATA(lv_xml) = zabaputil_cl_util=>xml_stringify( ls_data ).

" XML → ABAP
zabaputil_cl_util=>xml_parse(
    xml = lv_xml
    any = ls_data ).
```

## UUIDs

```abap
DATA(lv_uuid_32) = zabaputil_cl_util=>uuid_get_c32( ). " => '550E8400E29B41D4A716446655440000'
DATA(lv_uuid_22) = zabaputil_cl_util=>uuid_get_c22( ). " => 'VQ6EAOKbQdSnFkRmVU'
```

## RTTI

```abap
" Class existence
IF zabaputil_cl_util=>rtti_check_class_exists( 'ZCL_MY_CLASS' ) = abap_true.
  " ...
ENDIF.

" Type name of any value
DATA(lv_type) = zabaputil_cl_util=>rtti_get_type_name( ls_flight ). " => 'SFLIGHT'

" Build a dynamic table by DDIC name
DATA(lr_table) = zabaputil_cl_util=>rtti_create_tab_by_name( 'SFLIGHT' ).
```

## URL Parameters

```abap
DATA(lv_id) = zabaputil_cl_util=>url_param_get(
    val = 'ID'
    url = '/sap/bc/http/myapp?ID=12345&MODE=edit' ). " => '12345'

DATA(lv_url) = zabaputil_cl_util=>url_param_create_url(
    t_params = VALUE #(
        ( n = 'ID'   v = '12345' )
        ( n = 'MODE' v = 'edit' ) ) ). " => 'ID=12345&MODE=edit'
```

## Base64 & Encoding

```abap
DATA(lv_xstring) = zabaputil_cl_util=>conv_get_xstring_by_string( 'Hello' ).
DATA(lv_string)  = zabaputil_cl_util=>conv_get_string_by_xstring( lv_xstring ).

DATA(lv_base64)  = zabaputil_cl_util=>conv_encode_x_base64( lv_xstring ).
DATA(lv_decoded) = zabaputil_cl_util=>conv_decode_x_base64( lv_base64 ).
```

## CSV / XLSX

```abap
" Internal table → CSV / XLSX
DATA(lv_csv)  = zabaputil_cl_util=>itab_get_csv_by_itab( lt_flights ).
DATA(lv_xlsx) = zabaputil_cl_util=>conv_get_xlsx_by_itab( lt_flights ).

" CSV / XLSX → internal table
DATA(lr_itab) = zabaputil_cl_util=>itab_get_itab_by_csv( lv_csv ).

zabaputil_cl_util=>conv_get_itab_by_xlsx(
    EXPORTING val    = lv_xlsx
    IMPORTING result = lr_data ).
```

## Timestamps

```abap
DATA(lv_now)  = zabaputil_cl_util=>time_get_timestampl( ).
DATA(lv_past) = zabaputil_cl_util=>time_subtract_seconds( time = lv_now seconds = 3600 ).
DATA(lv_date) = zabaputil_cl_util=>time_get_date_by_stampl( lv_now ).
DATA(lv_time) = zabaputil_cl_util=>time_get_time_by_stampl( lv_now ).
```

## Error Handling

```abap
" Raise conditionally
zabaputil_cl_util=>x_check_raise( when = xsdbool( sy-subrc <> 0 ) ).

" Raise immediately
zabaputil_cl_util=>x_raise( 'Something went wrong' ).

" Get the last T100 message text from any exception
TRY.
    " ...
  CATCH cx_root INTO DATA(lx).
    DATA(lv_msg) = zabaputil_cl_util=>x_get_last_t100( lx ).
ENDTRY.
```

## Context

```abap
DATA(lv_user)  = zabaputil_cl_util=>context_get_user_tech( ).      " => 'DEVELOPER'
DATA(lv_cloud) = zabaputil_cl_util=>context_check_abap_cloud( ).   " => abap_true / abap_false
DATA(lt_stack) = zabaputil_cl_util=>context_get_callstack( ).
```

## HTTP Handler

```abap
" On-Premise
DATA(lo_http) = zabaputil_cl_util_http=>factory( server = lo_server ).

" ABAP Cloud
DATA(lo_http) = zabaputil_cl_util_http=>factory_cloud( req = lo_req res = lo_res ).

" Same interface in both worlds
DATA(ls_req_info) = lo_http->get_req_info( ).
lo_http->set_cdata( lv_json ).
lo_http->set_status( code = 200 reason = 'OK' ).
```

## Logging

```abap
DATA(lo_log) = NEW zabaputil_cl_util_log( ).

lo_log->info( `Step 1 completed` )
       ->success( `Imported 100 records` )
       ->warning( `Skipped 3 invalid rows` ).

DATA(lv_csv)  = lo_log->to_csv( ).
DATA(lv_xlsx) = lo_log->to_xlsx( ).
DATA(lt_msg)  = lo_log->to_msg( ).
```

Continue with the [API Reference](/api/overview) to drill into individual helpers.
