# Hadramedia

Hadramedia is an Arabic-first news and community media platform focused on Hadramout, the Yemeni diaspora, Yemen, and regional public-interest reporting.

**Live demo:** https://hadramedia.vercel.app

## Overview

The project provides a modern web experience for independent Arabic-language publishers and community newsrooms. It supports multiple editorial formats, including events, cross-media reports, stories, investigations, polls, cartoons, articles, studies, tools, and podcasts.

Hadramedia is being developed in public so contributors can improve the platform, reuse its components, and help make local digital publishing more accessible.

## Features

- Arabic-first, right-to-left user interface
- Multiple editorial sections and content formats
- Responsive interface built with React and Vite
- Tailwind CSS-based styling
- Supabase integration for data and storage workflows
- Vercel-ready deployment configuration

## Tech stack

- React
- Vite
- Tailwind CSS
- Supabase
- Vercel

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Local development

```bash
git clone https://github.com/MsalemX/Hadramedia.git
cd Hadramedia
npm install
npm run dev
```

Open the local URL shown by Vite in your browser. Configure any required environment variables before connecting the app to external services. Never commit secrets or production credentials.

### Production build

```bash
npm run build
npm run preview
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request. Good first contributions include accessibility fixes, RTL improvements, documentation, tests, reusable editorial components, and translation support.

## Roadmap

- Improve contributor documentation and local setup
- Add automated tests and continuous integration
- Expand accessibility and RTL coverage
- Extract reusable editorial components
- Document the content and storage architecture
- Create issue templates and well-scoped contributor tasks

## Security

Please do not report sensitive vulnerabilities in a public issue. Contact the maintainer privately with enough detail to reproduce and assess the problem.

## License

Hadramedia is available under the [MIT License](LICENSE).
