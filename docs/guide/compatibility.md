# Compatibility

`abap-util` ships in three flavors. They share the same source tree but are produced for different release lines.

## Supported Releases

| Stack | Branch | Notes |
| --- | --- | --- |
| **S/4 Public Cloud / BTP ABAP Environment** | `main` (ABAP Cloud) | Released APIs only. Some helpers (e.g. `set_session_stateful`) are no-ops. |
| **S/4 Private Cloud / On-Premise (ABAP Cloud)** | `main` | Full feature set, ABAP Cloud language version. |
| **S/4 Private Cloud / On-Premise (Standard ABAP)** | `main` | Full feature set, Standard ABAP language version. |
| **NetWeaver AS ABAP 7.02 and higher** | `702` | Auto-generated downport of `main`. |

## How the downport works

The library is written once in modern ABAP. A CI workflow (`auto_downport`) uses [abaplint](https://abaplint.org) to rewrite the modern syntax into a 7.02-compatible variant and pushes the result to the `702` branch. As a user you just install the branch that matches your system.

## Continuous Integration

Every push runs three matrix builds plus the unit tests:

- `ABAP_CLOUD` — builds against released cloud APIs only
- `ABAP_STANDARD` — builds with the standard ABAP language version
- `ABAP_702` — builds the down-ported flavor
- `test_unit` — executes all ABAP Unit tests
- `test_rename` — verifies that the rename script for embedding still works

If you fork the project, the same workflows are available out of the box.

## Embedding into your own namespace

`abap-util` ships under the `zabaputil_` prefix. If you want to embed it into your own product without occupying that prefix, the `rename` npm script in the source repo demonstrates how to bulk-rename objects with abaplint:

```bash
npm run rename
```

Read more about embedding in the [Architecture](./architecture) chapter.
