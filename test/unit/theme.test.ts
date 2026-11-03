// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { getNextTheme, loadTheme, saveTheme } from '../../src/features/theme';

describe('theme', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('getNextTheme switches between light and dark', () => {
    expect(getNextTheme('light')).toBe('dark');
    expect(getNextTheme('dark')).toBe('light');
  });

  it('loadTheme returns light when nothing is saved', () => {
    expect(loadTheme()).toBe('light');
  });

  it('saveTheme and loadTheme keep the chosen theme', () => {
    saveTheme('dark');
    expect(loadTheme()).toBe('dark');
  });
});