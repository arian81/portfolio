# Agent Guidelines for Portfolio Repository

This document provides coding guidelines and conventions for agents working in this SvelteKit portfolio repository.

## Project Overview

- **Framework**: SvelteKit 2.x with Svelte 5.x
- **Language**: TypeScript (strict mode enabled)
- **Styling**: TailwindCSS 4.x with Typography plugin
- **Package Manager**: pnpm (workspace setup)
- **Deployment**: Vercel via @sveltejs/adapter-vercel
- **Content**: MDSvex for markdown processing (.svx files)

## Build & Development Commands

```bash
# Install dependencies
pnpm install

# Development server (runs on localhost:5173)
pnpm run dev

# Production build
pnpm run build

# Preview production build locally
pnpm run preview

# Type checking
pnpm run check
pnpm run check:watch  # Watch mode

# Linting & Formatting
pnpm run lint         # Check ESLint and Prettier
pnpm run format       # Auto-format with Prettier

# SvelteKit sync
pnpm run prepare      # Sync SvelteKit generated types
```

### Testing

**Note**: No test framework is currently configured. If adding tests, recommend Vitest + Testing Library.

## Code Style & Formatting

### Prettier Configuration

- **Indentation**: Tabs (not spaces)
- **Quotes**: Single quotes
- **Trailing Commas**: None
- **Print Width**: 100 characters
- **Plugins**: prettier-plugin-svelte, prettier-plugin-tailwindcss

### Import Organization

1. Framework/library imports first
2. Internal imports ($lib aliases)
3. Relative imports
4. Asset imports last

Example:

```typescript
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { PageData } from './$types';
import { helper } from '$lib/utils';
import logo from '$lib/assets/logo.svg';
```

### TypeScript Guidelines

- **Strict Mode**: Enabled - all strict type checking options are on
- **Type Annotations**: Required for function parameters and return types
- **No `any`**: Avoid using `any` type; use `unknown` if truly needed
- **Module Resolution**: Uses bundler mode (SvelteKit standard)
- **File Extensions**: Use `.ts` for TypeScript, `.svelte` for components
- **Type Imports**: Use `import type` for type-only imports

```typescript
// Good
import type { User } from '$lib/types';
export function greet(name: string): string {
	return `Hello, ${name}`;
}

// Bad
import { User } from '$lib/types'; // Runtime import for type
export function greet(name) {
	// Missing types
	return `Hello, ${name}`;
}
```

### Svelte 5 Conventions

This project uses **Svelte 5 runes**. Follow these patterns:

```svelte
<script lang="ts">
	// Use $props() for component props
	let { title, count = 0 }: { title: string; count?: number } = $props();

	// Use $state() for reactive state
	let value = $state(0);

	// Use $derived() for computed values
	let doubled = $derived(value * 2);

	// Use $effect() for side effects
	$effect(() => {
		console.log('Value changed:', value);
	});
</script>
```

**Always** include `lang="ts"` in script tags for TypeScript support.

### Naming Conventions

- **Files**: Use kebab-case for regular files, PascalCase for components
  - Routes: `+page.svelte`, `+layout.svelte`, `+server.ts`
  - Components: `Button.svelte`, `NavBar.svelte`
  - Utils: `string-helpers.ts`, `api-client.ts`
- **Variables/Functions**: camelCase
- **Types/Interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE for true constants

```typescript
const API_ENDPOINT = 'https://api.example.com';
interface UserProfile {
	/* ... */
}
function fetchUserData(userId: string) {
	/* ... */
}
```

### Error Handling

- Use try/catch for async operations
- Provide meaningful error messages
- Log errors in development, handle gracefully in production

```typescript
try {
	const data = await fetch('/api/data');
	return await data.json();
} catch (error) {
	console.error('Failed to fetch data:', error);
	throw new Error('Unable to load data. Please try again.');
}
```

## SvelteKit Specific

### Routing & File Structure

- **Pages**: `src/routes/+page.svelte`
- **Layouts**: `src/routes/+layout.svelte`
- **Server Routes**: `src/routes/+server.ts`
- **Type Safety**: Auto-generated types in `$types` module
- **Library Code**: Place in `src/lib/` (accessible via `$lib` alias)

### Loading Data

Use `+page.ts` or `+page.server.ts` for data loading:

```typescript
// +page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		data: await fetchData(params.id)
	};
};
```

## ESLint Configuration

- Based on recommended configs for JS, TypeScript, and Svelte
- Prettier integration (no conflicting rules)
- `no-undef` disabled (TypeScript handles this)
- Respects .gitignore patterns

## Important Notes

1. **MDSvex**: Markdown files with `.svx` extension are processed as Svelte components
2. **Static Assets**: Place in `/static` directory (served at root path)
3. **Tailwind**: Uses v4 with CSS imports (`@import 'tailwindcss'` in layout.css)
4. **Icons/Favicons**: Stored in `$lib/assets/`
5. **Vercel Deployment**: Configured via adapter, no extra config needed

## Common Patterns

### Component Props (Svelte 5)

```svelte
<script lang="ts">
	interface Props {
		title: string;
		items: string[];
		optional?: boolean;
	}

	let { title, items, optional = false }: Props = $props();
</script>
```

### Reactive Statements

```svelte
<script lang="ts">
	let count = $state(0);
	let doubled = $derived(count * 2);
</script>
```

### Children Prop

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
```

## Before Committing

1. Run `pnpm run lint` to ensure code quality
2. Run `pnpm run check` to verify TypeScript types
3. Run `pnpm run format` to auto-format code
4. Ensure build passes: `pnpm run build`
