import { describe, it, expect } from 'vitest';
import { getDueStatus, getToday } from '../../src/features/dueDate';
import type { Todo } from '../../src/types';

const today = '2026-10-29';

const makeTodo = (dueDate?: string, completed = false): Todo => ({
  id: 1,
  text: 'Test todo',
  completed,
  dueDate,
});

describe('getDueStatus', () => {
  it('returns none when the todo has no due date', () => {
    expect(getDueStatus(makeTodo(), today)).toBe('none');
  });

  it('returns overdue when the due date is before today', () => {
    expect(getDueStatus(makeTodo('2026-10-28'), today)).toBe('overdue');
  });

  it('returns upcoming when the due date is today or later', () => {
    expect(getDueStatus(makeTodo('2026-10-29'), today)).toBe('upcoming');
    expect(getDueStatus(makeTodo('2026-11-05'), today)).toBe('upcoming');
  });

  it('returns none when the todo is completed, even if the date has passed', () => {
    expect(getDueStatus(makeTodo('2026-10-01', true), today)).toBe('none');
  });
});

describe('getToday', () => {
  it('returns the date in the format YYYY-MM-DD', () => {
    expect(getToday()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
