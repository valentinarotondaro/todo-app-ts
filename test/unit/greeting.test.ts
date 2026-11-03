import { describe, it, expect } from 'vitest';
import { getGreeting, formatToday } from '../../src/features/greeting';

describe('greeting', () => {
  it('getGreeting says good morning before 12', () => {
    expect(getGreeting(new Date(2026, 10, 3, 9, 0))).toBe('Good morning!');
  });

  it('getGreeting says good afternoon between 12 and 18', () => {
    expect(getGreeting(new Date(2026, 10, 3, 15, 0))).toBe('Good afternoon!');
  });

  it('getGreeting says good evening from 18', () => {
    expect(getGreeting(new Date(2026, 10, 3, 21, 0))).toBe('Good evening!');
  });

  it('formatToday shows the weekday, day and month', () => {
    expect(formatToday(new Date(2026, 10, 3))).toBe('Tuesday 3 November');
  });
});