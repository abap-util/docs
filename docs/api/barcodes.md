# Barcodes (GS1)

Parse, build and check GS1 element strings — the content of GS1-128, GS1 DataMatrix and GS1 QR codes. The methods work on **ABAP Cloud and Standard ABAP** alike.

The parsed barcode is a table of `zabaputil_cl_util_context=>ty_t_gs1`:

| Component | Type | Meaning |
| --- | --- | --- |
| `ai` | `string` | Application identifier, e.g. `01`, `10`, `3103` |
| `title` | `string` | GS1 data title, e.g. `GTIN`, `BATCH/LOT`, `NET WEIGHT (kg)` |
| `value` | `string` | The data field as scanned, without AI and separator |
| `decimals` | `i` | Implied decimal places of a measure or amount AI (`31nn`–`36nn`, `39nn`) |
| `date` | `d` | The value as a date for the date AIs (`11`, `12`, `13`, `15`, `16`, `17`, `7006`) |

## Signatures

| Method | Parameters | Returns |
| --- | --- | --- |
| `barcode_gs1_parse` | `val`, `separator` (optional), `check_digit` (default `abap_true`), `ref_date` (optional) | `ty_t_gs1` |
| `barcode_gs1_build` | `t_gs1`, `separator` (optional), `human_readable` (default `abap_false`) | `string` |
| `barcode_gs1_get_value` | `t_gs1`, `ai` | `string` |
| `barcode_gs1_calc_check_digit` | `val` | `string` |
| `check_is_gs1_check_digit` | `val` | `abap_bool` |

## `barcode_gs1_parse`

Splits a barcode into its element strings. Accepted input:

- **Raw scanner output** — an optional symbology identifier at the start (`]C1` GS1-128, `]e0` DataBar, `]d2` DataMatrix, `]Q3` QR) is removed, variable-length fields are terminated by the group separator GS (ASCII 29). A trailing CR/LF (scanners in keyboard mode) is ignored.
- **Human-readable form** — `(01)09506000134352(17)251231(10)ABC123`.

```abap
DATA(lt_gs1) = zabaputil_cl_util_context=>barcode_gs1_parse( `(01)09506000134352(17)251231(10)ABC123` ).
" => ai = `01` title = `GTIN`             value = `09506000134352`
"    ai = `17` title = `USE BY or EXPIRY` value = `251231` date = 20251231
"    ai = `10` title = `BATCH/LOT`        value = `ABC123`
```

### Custom separator

Many scanners cannot send the non-printable GS character and replace it with another one. Pass that character as `separator`:

```abap
lt_gs1 = zabaputil_cl_util_context=>barcode_gs1_parse( val = lv_scan  separator = `|` ).
```

### Dates

Date AIs (`YYMMDD`) are converted into the `date` component:

- The **century** follows the GS1 sliding window (GS1 General Specifications 7.12): a year more than 50 years ahead of the reference date lies in the previous century, a year more than 49 years back in the next one. The reference date is today unless you pass `ref_date`.
- **Day `00`** means the last day of the month: `(17)250200` becomes `20250228`.

```abap
lt_gs1 = zabaputil_cl_util_context=>barcode_gs1_parse( val      = `(17)991231`
                                                       ref_date = `20251126` ).
" => date = 19991231
```

### Decimals

Measure and amount AIs (`31nn`–`36nn`, `39nn`) carry the number of implied decimal places in their fourth digit. The parser returns it in `decimals`, the `value` stays as scanned: `(3103)001250` is `value = 001250`, `decimals = 3` — 1.250 kg.

### Errors

`barcode_gs1_parse` raises `zabaputil_cx_util_error` for

- an unknown application identifier,
- a field that is too short or too long,
- non-digits in a numeric field,
- an invalid date,
- a wrong check digit in SSCC, GTIN and GLN (only with `check_digit = abap_true`, the default).

```abap
TRY.
    DATA(lt_gs1) = zabaputil_cl_util_context=>barcode_gs1_parse( lv_scan ).
  CATCH zabaputil_cx_util_error INTO DATA(lx).
    " e.g. 'GS1: unknown application identifier (98)'
    MESSAGE lx->get_text( ) TYPE 'I'.
ENDTRY.
```

## `barcode_gs1_get_value`

Returns the value of an AI from a parsed barcode, initial if the AI is missing. A **three-digit AI** also matches the four-digit measure AIs, so `310` finds `3103` whatever the number of decimal places is.

```abap
DATA(lv_batch)  = zabaputil_cl_util_context=>barcode_gs1_get_value( t_gs1 = lt_gs1  ai = `10` ).
DATA(lv_weight) = zabaputil_cl_util_context=>barcode_gs1_get_value( t_gs1 = lt_gs1  ai = `310` ).
```

## `barcode_gs1_build`

The inverse of `barcode_gs1_parse`: builds the element string for a label from AI/value pairs. A group separator is inserted after every variable-length field that is followed by another field.

```abap
DATA(lv_code) = zabaputil_cl_util_context=>barcode_gs1_build( lt_gs1 ).

" with a printable separator instead of GS (ASCII 29)
DATA(lv_pipe) = zabaputil_cl_util_context=>barcode_gs1_build( t_gs1 = lt_gs1  separator = `|` ).

" the human-readable text under the barcode: (01)...(17)...(10)...
DATA(lv_text) = zabaputil_cl_util_context=>barcode_gs1_build( t_gs1 = lt_gs1  human_readable = abap_true ).
```

## `barcode_gs1_calc_check_digit`

Calculates the GS1 check digit (modulo 10, weights 3-1 from the right) for the digits of a GTIN-8/12/13/14, GLN, SSCC etc. **without** the check digit.

```abap
DATA(lv_digit) = zabaputil_cl_util_context=>barcode_gs1_calc_check_digit( `0950600013435` ). " => '2'
```

## `check_is_gs1_check_digit`

`abap_true` if the last digit of `val` is the correct GS1 check digit.

```abap
DATA(lv_ok) = zabaputil_cl_util_context=>check_is_gs1_check_digit( `09506000134352` ). " => abap_true
```

## See also

- [Validation](./validation) — further `check_*` helpers
- [Errors & Exceptions](./errors) — `zabaputil_cx_util_error`
