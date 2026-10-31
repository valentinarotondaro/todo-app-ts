import { todos, removeTodo, editTodo } from './todos';
import { getDueStatus } from './features/dueDate';
import { toggleTodo } from './features/toggle';


// Reference to the list in index.html (DOM + typecasting)
const todoList = document.getElementById('todo-list') as HTMLUListElement;

// Updates the DOM so it shows the current list of todos.
export const renderTodos = (): void => {
  todoList.innerHTML = '';

  todos.forEach(todo => {
        const li = document.createElement('li');
    const status = getDueStatus(todo);
        li.className = `todo-item due-${status}${todo.completed ? ' completed' : ''}`;
    li.innerHTML = `
          <input type="checkbox" class="toggle" ${todo.completed ? 'checked' : ''} />
      <span>${todo.text}</span>
      ${todo.dueDate ? `<small class="due-date">Due: ${todo.dueDate}${status === 'overdue' ? ' (overdue)' : ''}</small>` : ''}
      <button>Remove</button>
      <button id="editBtn">Edit</button>
    `;
    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
        addToggleListener(li, todo.id);
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
// Connects the checkbox of one list item.
const addToggleListener = (li: HTMLLIElement, id: number): void => {
  const checkbox = li.querySelector('.toggle') as HTMLInputElement;
  checkbox.addEventListener('change', () => {
    toggleTodo(id);
    renderTodos();
  });
};