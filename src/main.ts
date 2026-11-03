import './style.css';
import { getNextTheme, loadTheme, saveTheme } from './features/theme';
import type { Theme } from './features/theme';
import './theme.css';
import { addTodo, todos } from './todos';
import { validateTodoText } from './features/validation';
import { renderTodos } from './render';
import { getGreeting, formatToday } from './features/greeting';
import { setSearchQuery } from './features/search';
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
// Search: filter the list while the user types
const searchInput = document.getElementById('search-input') as HTMLInputElement;
searchInput.addEventListener('input', () => {
  setSearchQuery(searchInput.value);
  renderTodos();
});
// Dark mode: the theme is a data attribute on <html>, the CSS does the rest
const themeToggle = document.getElementById('theme-toggle') as HTMLButtonElement;
const applyTheme = (theme: Theme): void => {
  document.documentElement.dataset.theme = theme;
  themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
};
let theme: Theme = loadTheme();
applyTheme(theme);
themeToggle.addEventListener('click', () => {
  theme = getNextTheme(theme);
  saveTheme(theme);
  applyTheme(theme);
});

// Initial render
renderTodos();