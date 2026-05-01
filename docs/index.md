---
layout: home

hero:
  name: "abap-util"
  text: "Utility Functions for ABAP"
  tagline: One small toolbox for ABAP Cloud, S/4 and classic NetWeaver — strings, JSON, XML, RTTI, HTTP, logging and more.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: API Reference
      link: /api/overview
    - theme: alt
      text: View on GitHub
      link: https://github.com/abap-util/abap-util

features:
  - title: One API, Three Worlds
    details: Write the same code for ABAP Cloud (BTP / S/4 Public Cloud), Standard ABAP and NetWeaver 7.02. The library hides the language and API differences.
  - title: Class-Based, No Function Modules
    details: Static helpers grouped under a single facade class — no global function modules to remember, just <code>zabaputil_cl_util=>...</code>.
  - title: JSON, XML, CSV, XLSX
    details: Stringify and parse data in all common formats with a single line. Built on top of <a href="https://github.com/sbcgua/ajson">ajson</a> and <a href="https://github.com/sandraros/S-RTTI">S-RTTI</a>.
  - title: Runtime Reflection (RTTI)
    details: Inspect, build, copy and convert types at runtime with short, predictable helpers — without juggling <code>cl_abap_typedescr</code> directly.
  - title: HTTP Handler Abstraction
    details: A single object that exposes the same methods for on-premise <code>if_http_server</code> and ABAP Cloud <code>if_web_http_*</code>.
  - title: Logging & Messaging
    details: Fluent log builder with CSV/XLSX export, BAL persistence and a unified message extractor that understands <code>BAPIRET2</code>, exceptions and structures.
---
