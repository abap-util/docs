import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'abap-util',
  description: 'Utility Functions for ABAP Cloud & Standard ABAP',
  lang: 'en-US',
  base: '/docs/',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  themeConfig: {
    logo: undefined,

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'API Reference', link: '/api/overview' },
      {
        text: 'Resources',
        items: [
          { text: 'GitHub', link: 'https://github.com/abap-util/abap-util' },
          { text: 'abapGit', link: 'https://abapgit.org' },
          { text: 'Report an Issue', link: 'https://github.com/abap-util/abap-util/issues' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          collapsed: false,
          items: [
            { text: 'What is abap-util?', link: '/guide/introduction' },
            { text: 'Compatibility', link: '/guide/compatibility' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
            { text: 'Architecture', link: '/guide/architecture' }
          ]
        },
        {
          text: 'Concepts',
          collapsed: false,
          items: [
            { text: 'Class Overview', link: '/guide/classes' },
            { text: 'Naming Conventions', link: '/guide/naming' },
            { text: 'Error Handling', link: '/guide/error-handling' },
            { text: 'Cloud vs. On-Premise', link: '/guide/cloud-vs-onprem' }
          ]
        },
        {
          text: 'Contributing',
          collapsed: false,
          items: [
            { text: 'How to Contribute', link: '/guide/contributing' },
            { text: 'Credits', link: '/guide/credits' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'Reference',
          items: [
            { text: 'API Overview', link: '/api/overview' }
          ]
        },
        {
          text: 'Strings & Conversion',
          collapsed: false,
          items: [
            { text: 'Strings', link: '/api/strings' },
            { text: 'Conversion & Encoding', link: '/api/conversion' },
            { text: 'Time & Date', link: '/api/time' }
          ]
        },
        {
          text: 'Data Formats',
          collapsed: false,
          items: [
            { text: 'JSON', link: '/api/json' },
            { text: 'XML', link: '/api/xml' },
            { text: 'CSV', link: '/api/csv' },
            { text: 'XLSX / Excel', link: '/api/xlsx' }
          ]
        },
        {
          text: 'Internal Tables & Filters',
          collapsed: false,
          items: [
            { text: 'Internal Tables', link: '/api/itab' },
            { text: 'Filters & Tokens', link: '/api/filters' },
            { text: 'Ranges', link: '/api/ranges' }
          ]
        },
        {
          text: 'Runtime & Reflection',
          collapsed: false,
          items: [
            { text: 'RTTI', link: '/api/rtti' },
            { text: 'Booleans', link: '/api/booleans' },
            { text: 'UUIDs', link: '/api/uuid' },
            { text: 'Source & Apps', link: '/api/source' }
          ]
        },
        {
          text: 'Messaging & Errors',
          collapsed: false,
          items: [
            { text: 'Messages', link: '/api/messages' },
            { text: 'Errors & Exceptions', link: '/api/errors' },
            { text: 'Logging', link: '/api/logging' },
            { text: 'UI5 Messages', link: '/api/ui5' }
          ]
        },
        {
          text: 'Web & Persistence',
          collapsed: false,
          items: [
            { text: 'URL Parameters', link: '/api/url' },
            { text: 'HTTP Handler', link: '/api/http' },
            { text: 'Persistence', link: '/api/persistence' },
            { text: 'Context', link: '/api/context' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/abap-util/abap-util' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present abap-util contributors'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/abap-util/docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    }
  }
})
