# Renaming

abap-util can be installed under another name — a customer name such as `ZMYUTIL` or a registered namespace such as `/MYNS/`. Use it to run a private copy next to another installation in the same system, or to ship the library inside your own namespace.

## The `build_rename` workflow

The GitHub workflow [build_rename](https://github.com/abap-util/abap-util/actions/workflows/build_rename.yaml) is started manually (`workflow_dispatch`) with one input, the new name:

| Input | Example | Prefix | Result | Branch |
| --- | --- | --- | --- | --- |
| Customer name | `ZMYUTIL` | `zmyutil_` | `zmyutil_cl_util_context` | `rename_zmyutil` |
| Registered namespace | `/MYNS/` | `/myns/` | `/myns/cl_util_context` | `rename_myns` |

Rules for the name:

- a customer name starts with a letter, followed by letters or digits, **at most 10 characters**;
- a namespace is written with both slashes, **at most 10 characters** including the slashes;
- `ZABAPUTIL` itself is rejected — there is nothing to rename.

The workflow renames **every object** with abaplint and pushes the result to the branch `rename_<name>`, ready to pull with abapGit. Running it again with the same name updates the branch to the current `main`.

::: tip Need a renamed branch?
The workflow can only be started by maintainers of the repository. [Open an issue](https://github.com/abap-util/abap-util/issues) with the name you need, and the branch `rename_<name>` is built on request.
:::

## Installing the renamed branch

Install it like any other branch — see [Installation](./installation) — and choose `rename_<name>` as the branch. The renamed objects do not collide with an installation of `main` or with any other renamed copy.

## Object name length

ABAP object names are limited to 30 characters. Every object name in abap-util stays at **29 characters or less**, so even a 10-character name fits into the limit after the rename. The workflow `test_rename` checks this on every pull request (`npm run rename` renames every object to the longest prefix allowed and lints the result).

## Renaming single classes

Projects that only need a few classes copy and rename them one by one instead of renaming the whole library — see [Consumption Model](./architecture#consumption-model).
