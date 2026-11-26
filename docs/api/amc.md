# ABAP Messaging Channels

Send a text message to an ABAP Messaging Channel (AMC) — subscribers, e.g. a WebSocket connected via ABAP Push Channel, receive it at once.

::: warning Standard ABAP only
`amc_send` raises `zabaputil_cx_util_error` on ABAP Cloud.
:::

## `amc_send`

| Parameter | Meaning |
| --- | --- |
| `application_id` | AMC application, e.g. `ZMY_AMC` |
| `channel_id` | Channel, e.g. `/updates` |
| `message` | The text message |
| `channel_extension_id` | Optional channel extension, e.g. a document number |

```abap
zabaputil_cl_util_context=>amc_send( application_id = `ZMY_AMC`
                                     channel_id     = `/updates`
                                     message        = `refresh` ).

" only to the subscribers of one document
zabaputil_cl_util_context=>amc_send( application_id       = `ZMY_AMC`
                                     channel_id           = `/updates`
                                     channel_extension_id = lv_vbeln
                                     message              = `refresh` ).
```

The parameter types of `CL_AMC_CHANNEL_MANAGER` differ between releases; `amc_send` reads them at runtime, so the same call works on every Standard ABAP release with AMC.

## See also

- [HTTP Handler](./http) — the HTTP side of a UI that listens on the channel
