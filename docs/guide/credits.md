# Credits

`abap-util` stands on the shoulders of several excellent open-source ABAP projects.

## Vendored Libraries

These libraries are bundled inside the `src/00/` subpackage so consumers don't have to install them separately:

- [**ajson**](https://github.com/sbcgua/ajson) by Alexander Tsybulsky — the JSON parser/serializer that powers `json_stringify` and `json_parse`.
- [**S-RTTI**](https://github.com/sandraros/S-RTTI) by sandraros — RTTI (de)serialization that powers `xml_srtti_stringify` and `xml_srtti_parse`.

## Inspirations

- [**steampunkification**](https://github.com/heliconialabs/steampunkification) by Heliconia Labs — for the cloud/on-prem abstraction patterns.
- [**abapGit**](https://abapgit.org) — the distribution channel that makes shipping pure-source ABAP libraries possible.
- [**abaplint**](https://abaplint.org) — used both for linting and for the automatic downport to NetWeaver 7.02.

## Maintainer

The library is maintained at [github.com/abap-util/abap-util](https://github.com/abap-util/abap-util).

## License

Released under the [MIT License](https://github.com/abap-util/abap-util/blob/main/LICENSE). The vendored libraries retain their original licenses (also MIT-compatible).
