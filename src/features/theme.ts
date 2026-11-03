import { saveToStorage, loadFromStorage } from '../storage';

/** The two looks of the app. */
export type Theme = 'light' | 'dark';

/** The key (name) used to save the theme in localStorage. */
const THEME_KEY = 'theme';

/** Type guard: true when the data is 'light' or 'dark'. */
const isTheme = (data: unknown): data is Theme => data === 'light' || data === 'dark';

/**
 * Returns the other theme.
 * @param theme - The theme used now.
 * @returns 'dark' for 'light', and 'light' for 'dark'.
 */
export const getNextTheme = (theme: Theme): Theme => (theme === 'light' ? 'dark' : 'light');

/**
 * Loads the saved theme (uses the generic loadFromStorage<T>).
 * @returns The saved theme, or 'light' if nothing is saved.
 */
export const loadTheme = (): Theme => loadFromStorage<Theme>(THEME_KEY, 'light', isTheme);

/**
 * Saves the theme (uses the generic saveToStorage<T>).
 * @param theme - The theme to save.
 */
export const saveTheme = (theme: Theme): void => saveToStorage<Theme>(THEME_KEY, theme);