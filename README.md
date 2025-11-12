
# AI DOM Manipulator Chrome Extension

## Features

* **Natural Language Control:** Use a persistent sidebar chat to issue commands to modify the current webpage.
* **DOM Manipulation:** Executes actions on the page (e.g., changing colors, hiding elements, scraping data).
* **Manifest V3 Architecture:** Built using modern, secure extension standards.

## Tech Stack

* **Runtime/Package Manager:** [Bun](https://bun.sh/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **UI Framework:** React with TypeScript
* **Architecture:** Manifest V3 (Service Workers, Content Scripts)

## Getting Started (Development)

This guide assumes you have [Bun](https://bun.sh/) installed globally.

### Setup

1. Clone the repository and install the dependencies:

```bash
git clone [YOUR_REPO_URL]
cd [your-project-name]
bun install
```
2. Building the Extension
The build process compiles all source code (React UI, Service Worker, Content Script) into the final /dist folder.


# Compile and prepare the /dist folder
`bun run build `
3. Loading in Chrome
Navigate to chrome://extensions in your Chrome browser.

Enable Developer mode using the toggle in the top-right corner.

Click the "Load unpacked" button.

Select the /dist folder from your project directory.

The extension icon should now appear in your toolbar.


### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#### React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

#### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
