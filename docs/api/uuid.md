# UUIDs

Two convenient encodings of system-generated UUIDs.

## `uuid_get_c32`

Returns a 32-character hexadecimal UUID. Drop-in replacement for `cl_system_uuid=>create_uuid_c32_static( )` that also works on ABAP Cloud.

```abap
DATA(lv_uuid) = zabaputil_cl_util=>uuid_get_c32( ).
" => '550E8400E29B41D4A716446655440000'
```

## `uuid_get_c22`

Returns a 22-character base64-style UUID — useful when you need a shorter identifier (e.g. URL slugs or front-end keys).

```abap
DATA(lv_uuid) = zabaputil_cl_util=>uuid_get_c22( ).
" => 'VQ6EAOKbQdSnFkRmVU'
```

Both helpers transparently call the on-prem or cloud APIs (`cl_system_uuid` or `xco_cp=>uuid( )`), so you never have to think about which one is available.
