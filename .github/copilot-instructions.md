<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Repo-specific Copilot Instructions

This repository contains a small WordPress plugin that registers Gutenberg blocks. The goal of these instructions is to help an AI coding agent be productive quickly by describing the project's structure, build/debug flows, patterns, and important files to inspect.

Key points (read before editing):

- **Plugin entry**: `wp-content/Plugin/Custom blocks/custom-block-plugin.php` — the PHP bootstrap registers blocks from `blocks/` using `register_block_type(__DIR__ . '/blocks/<block-dir>')` on the `init` hook.
- **Block layout**: each block lives in its own directory under `blocks/` (example: `blocks/newsletter-block/`) and follows WordPress block conventions: `block.json`, `index.js`, `edit.js`, `save.js`, `style.css`, `editor.css`.
- **Build tooling**: the plugin uses `@wordpress/scripts` in `wp-content/Plugin/Custom blocks/package.json` (scripts: `build` → `wp-scripts build`, `start` → `wp-scripts start`). There is also a `webpack.config.js` shipped for local/custom builds.
- **Babel/webpack**: `webpack.config.js` expects source at `src/assets/block.js` for the custom `entry` but many blocks are under `blocks/<name>`. Be careful when changing entry points — `block.json` references `file:./build/index.js` for editor scripts.

What to inspect when making changes

- To add or modify a block: update `blocks/<block-name>/block.json`, `edit.js` and `save.js`. `index.js` should register the block using `registerBlockType` or export `edit`/`save` implementations. Example: `blocks/newsletter-block/index.js`.
- To change plugin registration: modify `custom-block-plugin.php`. It currently registers a single block directory explicitly. If adding multiple blocks, either add more `register_block_type` calls or make the registration loop over `blocks/*`.
- To adjust styles: `style.css` and `editor.css` live alongside block code and are referenced from `block.json` (`style: "file:./style.css"`).

Build / Run / Debug (developer flows)

- Install deps and start dev mode (from `wp-content/Plugin/Custom blocks`):

```bash
cd wp-content/Plugin/Custom\ blocks
npm install
npm run start    # runs `wp-scripts start`, serves watcher for blocks
```

- Build for production:

```bash
cd wp-content/Plugin/Custom\ blocks
npm run build    # runs `wp-scripts build` (produces built files used by WP)
```

- If you use the included `webpack.config.js` directly (custom builds), note the `entry` points and output `dist/`. The shipped `block.json` references `build/index.js` — ensure the built path matches `block.json` or update `block.json` accordingly.

Conventions and project-specific patterns

- Attributes naming: blocks in this repo sometimes use `heading` / `imageUrl` / `imageDesc` / `mainText` / `expandedText` / `isExpanded` (see `blocks/newsletter-block/block.json` and `edit.js`). When editing attributes, prefer `setAttributes({ attr: value })` — keep attribute names consistent with `block.json`.
- Mixed APIs: code uses both ESM `import` and global `wp` variables (e.g., `const { registerBlockType } = wp.blocks;`) in different files. Prefer keeping block files consistent with the surrounding file (match `index.js` pattern in that block).
- Duplicate exports: `blocks/newsletter-block/index.js` currently imports `registerBlockType` from `@wordpress/blocks` and also uses `wp.blocks.registerBlockType` — avoid duplicating registrations. If refactoring, keep one approach.
- CSS placement: editor-only styles go into `editor.css`. Frontend CSS goes into `style.css`. `block.json` references `style` and `editorScript` — update these when changing file paths.

Important files to review for most tasks

- `wp-content/Plugin/Custom blocks/custom-block-plugin.php` — plugin bootstrap and `register_block_type` calls.
- `wp-content/Plugin/Custom blocks/package.json` — scripts and WP scripts dependency.
- `wp-content/Plugin/Custom blocks/webpack.config.js` — custom build expectations and entry points.
- `wp-content/Plugin/Custom blocks/blocks/*` — block code and `block.json` metadata (primary development area).

Common gotchas discovered in repo

- `block.json` references `file:./build/index.js`, but repository `webpack.config.js` outputs to `dist/`. Ensure built filenames/paths match `block.json` or adjust the config.
- Some files mix `import` and global `wp` usage (see `index.js` and `assets/block.js`). When making changes, run the dev build to catch bundling or reference errors.

If you need to make a cross-cutting change

- Run `npm run build` (or `npm run start`) in `wp-content/Plugin/Custom\ blocks` and test in a local WP environment. The plugin is intended to be activated in WordPress to verify editor + frontend behavior.

When generating code examples

- Use the block directory structure from `blocks/newsletter-block/` as the canonical example. Provide `block.json` attribute shapes and `edit.js`/`save.js` signatures that align with WordPress block API v2.

When in doubt

- Prefer minimal, incremental changes that preserve current build paths and `block.json` references. If you must move build outputs, update `block.json` and the PHP registration accordingly.

Feedback

If any part of this file is unclear or you want me to expand examples (for example, a template `block.json` + `index.js` pairing), tell me which area to expand.
