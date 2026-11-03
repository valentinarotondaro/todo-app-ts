import { describe, it, expect, beforeEach } from 'vitest';
import { todos, addTodo, removeTodo, editTodo } from '../../src/todos';

describe('todos', () => {
  beforeEach(() => {
    todos.splice(0); // empty the list before each test
  });

  it('addTodo adds a new todo that is not completed', () => {
    const todo = addTodo('Buy milk');
    expect(todos).toHaveLength(1);
    expect(todo.text).toBe('Buy milk');
    expect(todo.completed).toBe(false);
  });

  it('removeTodo removes the todo with the given id', () => {
    const todo = addTodo('Buy milk');
    removeTodo(todo.id);
    expect(todos.find(t => t.id === todo.id)).toBeUndefined();
  });

  it('editTodo changes the text of a todo', () => {
    const todo = addTodo('Buy milk');
    editTodo(todo.id, 'Buy oat milk');
    expect(todo.text).toBe('Buy oat milk');
  });
});