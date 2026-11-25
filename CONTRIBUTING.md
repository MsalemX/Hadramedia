# Contributing to Hadramedia

Thank you for helping improve Hadramedia. Contributions that strengthen Arabic-language publishing, accessibility, right-to-left support, documentation, testing, and reusable editorial components are especially welcome.

## Before you start

- Search existing issues and pull requests to avoid duplicate work.
- Open an issue before starting a large feature or architectural change.
- Keep each pull request focused on one problem.
- Never commit credentials, API keys, personal data, or production secrets.

## Development setup

```bash
git clone https://github.com/MsalemX/Hadramedia.git
cd Hadramedia
npm install
npm run dev
```

## Quality checks

Run these checks before opening a pull request:

```bash
npm run lint
npm run build
```

Test the relevant pages in both desktop and mobile layouts. For interface changes, check Arabic right-to-left layout, keyboard navigation, readable contrast, and meaningful labels.

## Pull requests

A good pull request should:

- Explain the problem and the proposed solution.
- Reference a related issue when one exists.
- Describe how the change was tested.
- Include screenshots for visible interface changes.
- Avoid unrelated formatting or refactoring.
- Update documentation when behavior or setup changes.

## Reporting bugs

Please include:

- A clear description of the problem.
- Steps to reproduce it.
- Expected and actual behavior.
- Browser, device, and operating system details.
- Screenshots or console errors when useful.

## Feature proposals

Describe the user need first, then the proposed implementation. Explain how the feature supports local reporting, Arabic-language publishers, or reusable open-source components.

## Community standards

Be respectful, constructive, and patient. Focus feedback on the code and the user experience. Harassment, discrimination, and abusive behavior are not acceptable.

## License

By contributing, you agree that your contributions will be licensed under the repository's [MIT License](LICENSE).
