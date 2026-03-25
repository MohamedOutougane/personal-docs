import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'RavenBreach',
  tagline: "J'apprends la cybersec. Je pwn des box, mais c'est surtout elles qui pwn mon sommeil.",
  favicon: 'favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://mohamedoutougane.com',
  baseUrl: '/',

  organizationName: 'MohamedOutougane',
  projectName: 'personal-docs',

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'writeups',
        routeBasePath: 'writeups',
        path: './blog/writeups',
        blogTitle: 'Writeups',
        blogDescription: 'Mes writeups HackTheBox — Starting Point et CTFs',
        postsPerPage: 10,
        blogSidebarTitle: 'Writeups récents',
        blogSidebarCount: 15,
        showReadingTime: true,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
          title: 'RavenBreach — Writeups',
          description: 'Mes writeups HackTheBox et CTFs',
        },
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'ignore',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'articles',
        routeBasePath: 'articles',
        path: './blog/articles',
        blogTitle: 'Articles',
        blogDescription: 'Mes articles et tutoriels cybersécurité',
        postsPerPage: 10,
        blogSidebarTitle: 'Articles récents',
        blogSidebarCount: 10,
        showReadingTime: true,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
          title: 'RavenBreach — Articles',
          description: 'Mes articles et tutoriels cybersécurité',
        },
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'ignore',
      },
    ],
  ],

  themeConfig: {
    image: 'img/raven_actual.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'RavenBreach',
      logo: {
        alt: 'RavenBreach Logo',
        src: 'img/raven_actual.png',
        srcDark: 'img/raven_actual_inverse.png',
      },
      items: [
        {
          to: '/writeups',
          label: 'Writeups',
          position: 'left',
        },
        {
          to: '/articles',
          label: 'Articles',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'cheatsheetSidebar',
          label: 'Cheatsheet',
          position: 'left',
        },
        {
          type: 'docSidebar',
          sidebarId: 'methodologieSidebar',
          label: 'Méthodologie',
          position: 'left',
        },
        {
          href: 'https://github.com/MohamedOutougane',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contenu',
          items: [
            {label: 'Writeups', to: '/writeups'},
            {label: 'Articles', to: '/articles'},
          ],
        },
        {
          title: 'Ressources',
          items: [
            {label: 'Cheatsheet', to: '/docs/cheatsheet'},
            {label: 'Méthodologie', to: '/docs/methodologie'},
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/MohamedOutougane',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/mohamed-outougane-834175224/',
            },
            {
              label: 'YouTube',
              href: 'https://www.youtube.com/@Raven_Breach',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} RavenBreach — Mohamed Outougane`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'powershell', 'sql', 'python', 'php'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
