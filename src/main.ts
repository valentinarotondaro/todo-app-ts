import './style.css';
import { addTodo, todos } from './todos';
import { validateTodoText } from './features/validation';
import { renderTodos } from './render';

// References to the HTML elements (DOM + typecasting)
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
const dueDateInput = document.getElementById('due-date-input') as HTMLInputElement;

// Form submit: validate the input, add the todo and update the list.
// Form submit: validate the input, add the todo and update the list.
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();
  const result = validateTodoText(text, todos);

  if (result.valid) {
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    addTodo(text, dueDateInput.value || undefined);
    renderTodos();
    todoInput.value = '';
    dueDateInput.value = '';
  } else {
    errorMessage.textContent = result.message;
    todoInput.classList.add('input-error');
    errorMessage.style.display = 'block';
  }
});

// Color picker: changes the background color of the page.
const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color;
};

const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
  if (colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value);
    });
  } else {
    console.error('Color picker element not found');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker();
});

// Initial render
renderTodos();