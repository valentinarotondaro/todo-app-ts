// The Todo interface describes the shape of one todo item.
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  dueDate?: string; // NEW: optional due date, format YYYY-MM-DD
}

// NEW: the possible states of a due date (type alias + union type).
export type DueStatus = 'none' | 'upcoming' | 'overdue';