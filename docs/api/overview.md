# API Overview

Pick a topic to drill into the API reference. Every helper listed here lives on the façade `zabaputil_cl_util` unless stated otherwise.

## Strings & Conversion

- [Strings](./strings) — trim, case, contains/starts/ends, split, join
- [Conversion & Encoding](./conversion) — string ↔ xstring, Base64, dates
- [Time & Date](./time) — timestamps and arithmetic

## Data Formats

- [JSON](./json) — `json_stringify`, `json_parse`, filters
- [XML](./xml) — `xml_stringify`, `xml_parse`, S-RTTI variant, fluent builder
- [CSV](./csv) — internal table ↔ CSV
- [XLSX / Excel](./xlsx) — internal table ↔ XLSX

## Internal Tables & Filters

- [Internal Tables](./itab) — corresponding moves, struct extraction, value filter
- [Filters & Tokens](./filters) — multi-filter structures, SmartFilterBar tokens, SQL where
- [Ranges](./ranges) — ABAP ranges and SQL builders (`zabaputil_cl_util_range`)

## Runtime & Reflection

- [RTTI](./rtti) — type kind, attributes, dynamic table creation, class lookups
- [Booleans](./booleans) — `boolean_check_by_data`, `boolean_check_by_name`, `boolean_abap_2_json`
- [UUIDs](./uuid) — 32-char hex and 22-char base64
- [Source & Apps](./source) — read source code, build app URLs

## Messaging & Errors

- [Messages](./messages) — extract messages from structures, exceptions and BAL
- [Errors & Exceptions](./errors) — `zabaputil_cx_util_error` and the `x_*` helpers
- [Logging](./logging) — `zabaputil_cl_util_log`, fluent log builder
- [UI5 Messages](./ui5) — translate ABAP types into UI5 message types

## Web & Persistence

- [URL Parameters](./url) — read, build and update URL query strings
- [HTTP Handler](./http) — `zabaputil_cl_util_http`, unified request/response wrapper
- [Persistence](./persistence) — `zabaputil_cl_util_db`, generic key/value store
- [Context](./context) — current user, tenant, callstack, cloud detection
