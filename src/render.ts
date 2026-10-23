import { todos, removeTodo, editTodo } from './todos';

// Reference to the list in index.html (DOM + typecasting)
const todoList = document.getElementById('todo-list') as HTMLUListElement;

// Updates the DOM so it shows the current list of todos.
export const renderTodos = (): void => {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <span>${todo.text}</span>
      <button>Remove</button>
      <button id="editBtn">Edit</button>
    `;
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    todoList.appendChild(li);
  });
};

// Connects the Remove button of one list item.
const addRemoveButtonListener = (li: HTMLLIElement, id: number): void => {
  const removeButton = li.querySelector('button');
  removeButton?.addEventListener('click', () => {
    removeTodo(id);
    renderTodos();
  });
};

// Connects the Edit button of one list item.
const addEditButtonListener = (li: HTMLLIElement, id: number): void => {
  const editButton = li.querySelector('#editBtn');
  editButton?.addEventListener('click', () => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return;
    const text = prompt('Edit todo', todo.text);
    if (text) {
      editTodo(id, text);
      renderTodos();
    }
  });
};