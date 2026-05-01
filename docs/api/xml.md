# XML

`abap-util` ships three different XML helpers, each tuned for a different scenario.

## Quick Picker

| Use case | Helper |
| --- | --- |
| Round-trip ABAP data (typed) | [`xml_stringify` / `xml_parse`](#xml-stringify) |
| Round-trip ABAP data including its RTTI metadata | [`xml_srtti_*`](#xml-srtti-stringify) |
| Build arbitrary XML by hand | [Fluent builder](#fluent-xml-builder) |

## `xml_stringify`

Render any ABAP value into asXML (the native XSLT-based XML representation). Raises `cx_xslt_serialization_error` on failure.

```abap
DATA(lv_xml) = zabaputil_cl_util=>xml_stringify( ls_data ).
```

## `xml_parse`

Inverse of `xml_stringify`. The target value type drives the deserialization.

```abap
zabaputil_cl_util=>xml_parse(
    xml = lv_xml
    any = ls_data ).
```

## `xml_srtti_stringify`

Serialize **value + type information** in one go. Use this when the receiver does not know the target type at compile time (e.g. the [Persistence](./persistence) service uses it).

```abap
DATA(lv_blob) = zabaputil_cl_util=>xml_srtti_stringify( data = ls_data ).
```

## `xml_srtti_parse`

Inverse of `xml_srtti_stringify`. Returns a freshly created `REF TO data` whose runtime type matches the original.

```abap
DATA(lr_data) = zabaputil_cl_util=>xml_srtti_parse( rtti_data = lv_blob ).
ASSIGN lr_data->* TO FIELD-SYMBOL(<data>).
```

## Fluent XML Builder

`zabaputil_cl_util_xml` lets you build an XML tree without writing a single string. Useful for hand-crafted SOAP envelopes, OData payloads or custom export formats.

### Factory

```abap
DATA(lo_xml) = zabaputil_cl_util_xml=>factory( ).
```

### Adding nodes

| Method | Meaning |
| --- | --- |
| `__( n )` | Add a child node and **descend** into it |
| `_( n )`  | Add a child node, stay on the current node |
| `_if( when n )` / `__if( when n )` | Add (and descend) only if `when = abap_true` |
| `n( name )` | Navigate **up** to the nearest ancestor named `name` |
| `n( )` | Navigate **up** to the parent |
| `n_root( )` | Navigate to the root |
| `n_prev( )` | Navigate to the previously created node |
| `p( n v )` | Add an attribute to the current node |

Each builder method also accepts:

- `ns` — XML namespace prefix
- `a` / `v` — convenience for a single attribute name/value
- `p` — table of `(n v)` pairs for multiple attributes

### Stringify

```abap
DATA(lv_xml) = lo_xml->stringify(
    from_root = abap_true   " default
    indent    = abap_true ).
```

### Example

```abap
DATA(lv_xml) =
  zabaputil_cl_util_xml=>factory( )
    ->__( n = 'orders' )
      ->__( n = 'order' a = 'id' v = '1' )
        ->_( n = 'customer' v = 'ACME' )
        ->_( n = 'amount'   v = '99.95' )
      ->n( 'orders' )
      ->__( n = 'order' a = 'id' v = '2' )
        ->_( n = 'customer' v = 'Globex' )
    ->n_root( )
    ->stringify( indent = abap_true ).
```

Produces:

```xml
<orders>
  <order id="1">
    <customer>ACME</customer>
    <amount>99.95</amount>
  </order>
  <order id="2">
    <customer>Globex</customer>
  </order>
</orders>
```
