import type { Todo, Priority } from '../types';

/** All priority levels, from most to least important. */
export const PRIORITIES: Priority[] = ['high', 'medium', 'low'];

/**
 * A number for each priority, so todos can be sorted (lower = more important).
 * `Record<Priority, number>` makes TypeScript check that no priority is missing.
 */
const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

/**
 * Returns the priority of a todo.
 *
 * @param todo - The todo to check.
 * @returns The priority, or `'medium'` for old todos without priority.
 */
export const getPriority = (todo: Todo): Priority => todo.priority ?? 'medium';

/**
 * Sorts todos by priority (high first).
 * Todos with the same priority keep their original order.
 *
 * @param todos - The list to sort.
 * @returns A new sorted list. The original list is not changed.
 */
export const sortByPriority = (todos: Todo[]): Todo[] =>
  [...todos].sort((a, b) => PRIORITY_ORDER[getPriority(a)] - PRIORITY_ORDER[getPriority(b)]);