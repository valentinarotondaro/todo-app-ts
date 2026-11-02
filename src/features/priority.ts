import type { Todo, Priority } from '../types';

// All priority levels, from most to least important.
export const PRIORITIES: Priority[] = ['high', 'medium', 'low'];

// A number for each priority, so todos can be sorted (lower = more important).
const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

// Returns the priority of a todo. Old todos without priority count as medium.
export const getPriority = (todo: Todo): Priority => todo.priority ?? 'medium';

// Returns a new list sorted by priority (high first).
// Todos with the same priority keep their original order.
export const sortByPriority = (todos: Todo[]): Todo[] =>
  [...todos].sort((a, b) => PRIORITY_ORDER[getPriority(a)] - PRIORITY_ORDER[getPriority(b)]);
