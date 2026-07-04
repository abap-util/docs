# Texts & Domains

Resolve T100 message texts and domain fixed values (enum-style) at runtime.

## `text_get`

Resolves a T100 message with up to four placeholders in a given language (defaults to `sy-langu`).

```abap
DATA(lv_text) = zabaputil_cl_util=>text_get(
    msgid = `ZMY_MESSAGES`
    msgno = `001`
    v1    = `42` ).
" e.g. => 'Order 42 was created'
```

## `enum_to_text`

Translates a domain value into its fixed-value description.

```abap
DATA(lv_text) = zabaputil_cl_util=>enum_to_text(
    domain = `ZSTATUS`
    value  = `A` ). " => 'Active'
```

Pass `langu` to resolve in a specific language.

## `enum_get_all`

Returns all fixed values of a domain as a name/value table — ideal for building dropdowns.

```abap
DATA(lt_values) = zabaputil_cl_util=>enum_get_all( domain = `ZSTATUS` ).
" => [(n='A' v='Active'), (n='I' v='Inactive'), ...]
```

## See also

- [Messages](./messages) — extract message texts from exceptions, `BAPIRET2` and more
- [RTTI](./rtti) — `rtti_get_t_ddic_fixed_values` for fixed values by type
