# Contributing

Pull requests are welcome — bug fixes, new helpers and documentation improvements alike.

## Reporting Issues

Please open an issue at the [main repository](https://github.com/abap-util/abap-util/issues). When reporting a bug, include:

- ABAP release and language version (Standard / Cloud / 7.02)
- The shortest reproducible snippet
- Expected vs. actual behavior
- Stack trace from `lx->get_text( )` if relevant

## Development Setup

1. Fork the [abap-util/abap-util](https://github.com/abap-util/abap-util) repo.
2. Clone it into an SAP system via abapGit (see [Installation](./installation)).
3. Install the npm tooling locally if you want to run the offline unit tests:
   ```bash
   npm ci
   ```
4. The scripts:
   ```bash
   npm run lint            # abaplint, Standard ABAP (v750)
   npm run lint:cloud      # abaplint, ABAP Cloud
   npm run rename          # rename every object to the longest prefix allowed
   npm run check           # lint, lint:cloud and rename
   npm run auto_transpile  # transpile ABAP to JavaScript
   npm run unit            # run the unit tests in Node.js
   npm test                # check, auto_transpile and unit in one go
   npm run downport        # rewrite src/ to 7.02 syntax - what auto_downport pushes to 702, never commit the result
   npm run cleanup         # remove the abaplint output folder
   ```
   CI runs the unit tests twice: on the `main` source and on the downported source.

## Coding Guidelines

- Add helpers to `zabaputil_cl_util_context` whenever they fit the existing prefix groups (`c_`, `rtti_`, `time_`, …).
- Cover every new helper with an ABAP Unit test in the corresponding `*.testclasses.abap` file.
- Avoid release-specific syntax in the façade. If a helper needs a cloud-only or on-prem-only API, branch on `check_abap_cloud( )` and call the API dynamically, so the class still compiles on every release.
- Run `abaplint` locally before committing — the CI will reject lint failures.

## Pull Requests

- Keep PRs focused: one feature or one fix per PR.
- Reference the issue you fix (e.g. `Fixes #123`).
- Update or add documentation in the [docs repo](https://github.com/abap-util/docs) when the public API changes.

## Code of Conduct

The project follows the contributor [Code of Conduct](https://github.com/abap-util/abap-util/blob/main/CODE_OF_CONDUCT.md). By participating you agree to abide by it.

## License

`abap-util` is released under the [MIT License](https://github.com/abap-util/abap-util/blob/main/LICENSE). Contributions are accepted under the same license.
