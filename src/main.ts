import './style.css';
import './theme.css';
import { addTodo, todos } from './todos';
import { validateTodoText } from './features/validation';
import { renderTodos } from './render';
import { getGreeting, formatToday } from './features/greeting';
import type { Category, Priority } from './types';

// References to the HTML elements (DOM + typecasting)
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
const dueDateInput = document.getElementById('due-date-input') as HTMLInputElement;
const categoryInput = document.getElementById('category-input') as HTMLSelectElement;
const priorityInput = document.getElementById('priority-input') as HTMLSelectElement;

// Form submit: validate the input, add the todo and update the list.
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  const result = validateTodoText(text, todos);

  if (result.valid) {
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
        addTodo(text, dueDateInput.value || undefined, categoryInput.value as Category, priorityInput.value as Priority);
    renderTodos();
    todoInput.value = '';
    dueDateInput.value = '';
  } else {
    errorMessage.textContent = result.message;
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  }
});
// Greeting and today's date at the top of the board
const now = new Date();
(document.getElementById('greeting') as HTMLHeadingElement).textContent = getGreeting(now);
(document.getElementById('today') as HTMLParagraphElement).textContent = formatToday(now);

// Initial render
renderTodos();