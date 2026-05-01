# What is abap-util?

`abap-util` is a small, opinionated collection of utility classes for the ABAP language. It bundles the everyday helpers that almost every project rebuilds from scratch — string handling, JSON/XML serialization, RTTI helpers, HTTP, logging — into a single, well-tested package that runs on:

- **S/4 Public Cloud** and **BTP ABAP Environment** (ABAP Cloud)
- **S/4 Private Cloud** and **On-Premise** (ABAP Cloud and Standard ABAP)
- **R/3 NetWeaver AS ABAP 7.02** or higher (Standard ABAP)

## Why?

Standard ABAP, ABAP for SAP Cloud Platform and ABAP Cloud each ship with a slightly different set of system classes. A snippet that works on-prem may use a class that is not released for cloud — and vice-versa. `abap-util` hides those differences behind one stable façade so the calling code looks identical everywhere:

```abap
" Same call on every supported release
DATA(lv_user) = zabaputil_cl_util=>context_get_user_tech( ).
DATA(lv_id)   = zabaputil_cl_util=>uuid_get_c32( ).
DATA(lv_json) = zabaputil_cl_util=>json_stringify( ls_data ).
```

## Key Features

- **Simplified SAP APIs** — one short, class-based method instead of long parameter lists
- **Hides language version differences** between ABAP Cloud and Standard ABAP
- **Broad function scope** — UUIDs, RTTI, messages, ranges, persistence, HTTP, JSON, XML, CSV, XLSX, ranges, filters, logging
- **No new transport** — every helper lives in one of a handful of `Z*` classes

## Design Principles

1. **One façade, many helpers.** Most users only need `zabaputil_cl_util` — every common helper is reachable from there as a static method.
2. **Predictable naming.** Methods are grouped by prefix (`json_`, `xml_`, `rtti_`, `time_`, `c_`, `url_param_`, …) so you can discover the API with code completion.
3. **No unchecked exceptions.** The custom exception class `zabaputil_cx_util_error` inherits from `cx_no_check`, so you opt into `TRY/CATCH` only where you actually need it.
4. **Down-portable.** The 7.02 build is generated automatically from the same source — don't write 7.02-specific code yourself.

## Where to next?

- New to the library? → [Quick Start](./quick-start)
- Need a feature reference? → [API Overview](/api/overview)
- Curious about the structure? → [Architecture](./architecture)
