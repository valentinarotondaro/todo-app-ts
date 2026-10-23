import './style.css';
import { addTodo } from './todos';
import { renderTodos } from './render';

// References to the HTML elements (DOM + typecasting)
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;

// Form submit: validate the input, add the todo and update the list.
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (text !== '') {
    todoInput.classList.remove('input-error');
    errorMessage.style.display = 'none';
    addTodo(text);
    renderTodos();
    todoInput.value = '';
  } else {
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