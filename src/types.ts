/**
 * One todo item.
 * The optional properties (`?`) are optional so todos saved before a feature existed still load.
 */
export interface Todo {
  /** Unique id, based on the time the todo was created. */
  id: number;
  /** The text the user typed. */
  text: string;
  /** True when the todo is marked as done. */
  completed: boolean;
  /** Optional due date in the format YYYY-MM-DD. */
  dueDate?: string;
  /** The category of the todo. Old todos without category count as personal. */
  category?: Category;
  /** The priority of the todo. Old todos without priority count as medium. */
  priority?: Priority;
}

/** The possible states of a due date (type alias + union type). */
export type DueStatus = 'none' | 'upcoming' | 'overdue';

/** The categories a todo can belong to (type alias + union type). */
export type Category = 'work' | 'personal' | 'study' | 'home';

/** The priority levels of a todo (type alias + union type). */
export type Priority = 'low' | 'medium' | 'high';