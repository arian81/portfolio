<script lang="ts" generics="T extends readonly string[]">
	import { untrack } from 'svelte';
	import { MEDIA } from './constants';
	import type { SvelteThemeProps } from './types';
	import { Theme } from './theme.state.svelte';
	import { escapeForInlineScript, escapeJsString } from './helpers';

	let {
		forcedTheme = undefined,
		disableTransitionOnChange = false,
		enableSystem = true,
		enableColorScheme = true,
		storageKey = 'theme',
		themes,
		defaultTheme = enableSystem ? 'system' : 'light',
		attribute = 'data-theme',
		value = undefined,
		colorScheme,
		children
	}: SvelteThemeProps<T> = $props();

	// Capture initial values for the inline script (intentionally non-reactive).
	// The inline script runs once on page load to prevent FOUC before hydration.
	// Subsequent theme changes are handled reactively by the Theme class.
	// Using untrack() makes this intent explicit and suppresses Svelte warnings.
	const initialValue = untrack(() => value);
	const initialColorScheme = untrack(() => colorScheme);
	const initialStorageKey = untrack(() => storageKey);
	const initialEnableSystem = untrack(() => enableSystem);
	const initialEnableColorScheme = untrack(() => enableColorScheme);
	const initialAttribute = untrack(() => attribute);
	const initialForcedTheme = untrack(() => forcedTheme);
	const initialThemes = untrack(() => themes);

	// Validate defaultTheme is in themes array
	const validatedDefaultTheme = (() => {
		const defaultThemes = ['light', 'dark'];
		const currentThemes = (
			initialThemes && initialThemes.length > 0 ? initialThemes : defaultThemes
		) as string[];
		const finalThemes =
			initialEnableSystem && !currentThemes.includes('system')
				? currentThemes.concat('system')
				: currentThemes;

		// If defaultTheme is not in the themes array, fall back to first theme
		return finalThemes.includes(defaultTheme) ? defaultTheme : finalThemes[0];
	})();

	const theme = new Theme({
		get forcedTheme() {
			return forcedTheme;
		},
		get themes() {
			const defaultThemes = ['light', 'dark'];
			const currentThemes = (themes && themes.length > 0 ? themes : defaultThemes) as string[];
			if (enableSystem && !currentThemes.includes('system')) {
				return currentThemes.concat('system');
			}
			return currentThemes;
		},
		get enableSystem() {
			return enableSystem;
		},

		get enableColorScheme() {
			return enableColorScheme;
		},
		get colorScheme() {
			return colorScheme;
		},

		get defaultTheme() {
			return validatedDefaultTheme;
		},
		get attribute() {
			return attribute;
		},
		get value() {
			return value;
		},
		get storageKey() {
			return storageKey;
		},
		get disableTransitionOnChange() {
			return disableTransitionOnChange;
		}
	});

	const attrs = !initialValue
		? initialThemes || []
		: (Object.values(initialValue || {}) as string[]);

	// Encapsulate script tag into string so as not to mess with the compiler
	// This inline script runs before hydration to prevent FOUC (Flash of Unstyled Content)
	const themeScript = `<script>
		function svelteTheme(){		
		var d=document.documentElement;
		var x=${escapeForInlineScript(initialValue || {})};
		var y=${escapeForInlineScript(initialColorScheme || {})};
		var validThemes=${escapeForInlineScript(theme.themes)};		
		var localStorageTheme; try { localStorageTheme = localStorage.getItem('${escapeJsString(initialStorageKey)}'); } catch(e) { localStorageTheme = null; }
		var systemTheme = ${initialEnableSystem ? `window.matchMedia('${MEDIA}').matches ? 'dark' : 'light'` : "'normal'"};
		var isValidTheme = validThemes.indexOf(localStorageTheme) !== -1;	
		var isSystemThemeButDisabled = localStorageTheme === 'system' && ${!initialEnableSystem};
		var currentTheme = isValidTheme ? localStorageTheme : '${escapeJsString(validatedDefaultTheme)}';
		if (isSystemThemeButDisabled) {
			currentTheme = '${escapeJsString(validatedDefaultTheme)}';
			try { localStorage.setItem('${escapeJsString(initialStorageKey)}', currentTheme); } catch(e) {}
		}		
		var isSystemTheme = ${initialEnableSystem ? "currentTheme === 'system'" : 'false'};
		var resolvedTheme = ${initialForcedTheme ? `'${escapeJsString(initialForcedTheme)}'` : `isSystemTheme ? systemTheme : currentTheme`};				
		var colorSchemeMode = y[resolvedTheme] || (resolvedTheme === 'light' || resolvedTheme === 'dark' ? resolvedTheme : 'normal');
		var val = x[resolvedTheme] || resolvedTheme;
		${initialEnableColorScheme ? `d.style.setProperty('color-scheme', colorSchemeMode);` : ''}
		${initialAttribute === 'class' ? `d.classList.remove(${attrs.map((t) => `'${escapeJsString(t)}'`).join(',')})` : ''};
		${initialAttribute === 'class' ? `d.classList.add(val);` : `d.setAttribute('${escapeJsString(initialAttribute)}', val);`};
		};svelteTheme();
		</${'script'}>`;
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- Intentional: script prevents FOUC, values are escaped -->
	{@html themeScript}
</svelte:head>
{@render children?.(theme)}
