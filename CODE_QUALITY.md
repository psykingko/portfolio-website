# Code Quality Setup

This document describes the code quality tools and configurations set up for the portfolio website project.

## Tools Configured

### ESLint

- **Purpose**: Static code analysis and linting for JavaScript/TypeScript
- **Configuration**: `eslint.config.mjs`
- **Rules**:
  - Next.js recommended rules
  - TypeScript recommended rules
  - Prettier integration
  - Custom rules for code quality

### Prettier

- **Purpose**: Code formatting
- **Configuration**: `.prettierrc`
- **Settings**:
  - 2-space indentation
  - Semicolons enabled
  - Double quotes for strings
  - Trailing commas in ES5-compatible locations

### Husky

- **Purpose**: Git hooks management
- **Configuration**: `.husky/` directory
- **Hooks**: Pre-commit hook that runs lint-staged

### lint-staged

- **Purpose**: Run linters on staged files only
- **Configuration**: `package.json` lint-staged section
- **Actions**:
  - ESLint with auto-fix for JS/TS files
  - Prettier formatting for all supported files

## Available Scripts

### Linting

```bash
# Run ESLint with auto-fix
npm run lint

# Run ESLint without auto-fix (check only)
npm run lint:check
```

### Formatting

```bash
# Format all files with Prettier
npm run format

# Check formatting without making changes
npm run format:check
```

### Type Checking

```bash
# Run TypeScript compiler check
npm run type-check
```

## Pre-commit Hook

The pre-commit hook automatically runs when you commit changes:

1. **Stages files**: Only processes files that are staged for commit
2. **Runs ESLint**: Automatically fixes linting issues where possible
3. **Runs Prettier**: Formats code according to project standards
4. **Fails commit**: If there are unfixable linting errors

### Example Workflow

```bash
# Make changes to files
git add .

# Commit (pre-commit hook runs automatically)
git commit -m "Your commit message"

# If there are issues, fix them and try again
npm run lint
npm run format
git add .
git commit -m "Your commit message"
```

## Configuration Files

### `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### `eslint.config.mjs`

- Extends Next.js and TypeScript recommended configurations
- Integrates with Prettier to avoid conflicts
- Includes custom rules for better code quality
- Configured to ignore build outputs and configuration files

### `package.json` lint-staged configuration

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css,scss,yaml,yml}": ["prettier --write"]
  }
}
```

## IDE Integration

### VS Code

Install these extensions for the best experience:

- ESLint
- Prettier - Code formatter
- TypeScript Importer

### Settings

Add to your VS Code settings.json:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Troubleshooting

### Common Issues

1. **Pre-commit hook not running**
   - Ensure Husky is installed: `npm run prepare`
   - Check that `.husky/pre-commit` file exists and is executable

2. **ESLint errors**
   - Run `npm run lint` to see all issues
   - Many issues can be auto-fixed with `npm run lint`
   - Check the ESLint configuration if rules seem incorrect

3. **Prettier conflicts with ESLint**
   - The configuration includes `eslint-config-prettier` to disable conflicting rules
   - If you see conflicts, ensure both tools are using the latest configurations

4. **Performance issues**
   - lint-staged only processes staged files for better performance
   - Consider adding more file patterns to `.prettierignore` if needed

### Manual Commands

If you need to bypass the pre-commit hook temporarily:

```bash
git commit --no-verify -m "Your message"
```

**Note**: Only use `--no-verify` in exceptional circumstances, as it bypasses all quality checks.

## Maintenance

### Updating Dependencies

```bash
# Update ESLint and related packages
npm update eslint eslint-config-next eslint-config-prettier eslint-plugin-prettier

# Update Prettier
npm update prettier

# Update Husky and lint-staged
npm update husky lint-staged
```

### Adding New Rules

1. Edit `eslint.config.mjs` to add new ESLint rules
2. Update `.prettierrc` for formatting preferences
3. Test changes with `npm run lint:check` and `npm run format:check`
4. Update this documentation if needed

This setup ensures consistent code quality and formatting across the entire project while providing a smooth developer experience.
