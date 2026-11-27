# abap-util documentation

The official documentation for [`abap-util`](https://github.com/abap-util/abap-util) — utility functions for ABAP Cloud and Standard ABAP.

Built with [VitePress](https://vitepress.dev/).

## Local development

```bash
npm ci
npm run docs:dev      # http://localhost:5173
```

## Check

```bash
npm run check         # every zabaputil_* name in the docs exists in the sources
```

The check clones [abap-util](https://github.com/abap-util/abap-util) and [business-api](https://github.com/abap-util/business-api) at `main` and compares every `zabaputil_*` name in `docs/` with their objects and methods. See [AGENTS.md](AGENTS.md) for the rules and the environment variables.

## Build

```bash
npm run docs:build    # output in docs/.vitepress/dist
npm run docs:preview  # serve the production build
```

## Structure

```
docs/
├── .vitepress/
│   └── config.mjs    ← navigation, sidebar, theme
├── index.md          ← landing page
├── guide/            ← user-facing concepts
└── api/              ← API reference grouped by topic
```

## Contributing

Open a pull request against the `main` branch. For substantial changes, please open an issue first to discuss what you would like to change.

The library itself lives at [abap-util/abap-util](https://github.com/abap-util/abap-util).

## License

[MIT](LICENSE)
