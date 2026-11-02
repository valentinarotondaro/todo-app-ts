import { todos, removeTodo, editTodo } from './todos';
import { getDueStatus } from './features/dueDate';
import { sortByPriority, getPriority } from './features/priority';
import { toggleTodo } from './features/toggle';
import { CATEGORIES, filterByCategory, countByCategory, getActiveCategory, setActiveCategory } from './features/categories';
import type { CategoryFilter } from './features/categories';
import { STATUSES, filterByStatus, countByStatus, getActiveStatus, setActiveStatus } from './features/statusFilter';
import type { Todo } from './types';

// Reference to the list in index.html (DOM + typecasting)
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const categoryFilter = document.getElementById('category-filter') as HTMLDivElement;
const statusFilter = document.getElementById('status-filter') as HTMLDivElement;

// "work" → "Work"
const label = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

// Updates the DOM so it shows the current list of todos.
// First filter by category, then by status, then sort by priority (high first).
export const renderTodos = (): void => {
  todoList.innerHTML = '';

  renderCategoryFilter();
  const inCategory = filterByCategory(todos, getActiveCategory());
  renderStatusFilter(inCategory);
  sortByPriority(filterByStatus(inCategory, getActiveStatus())).forEach(todo => {
    const li = document.createElement('li');
    const status = getDueStatus(todo);
    li.className = `todo-item due-${status} cat-${todo.category ?? 'personal'} priority-${getPriority(todo)}${todo.completed ? ' completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" class="toggle" ${todo.completed ? 'checked' : ''} />
      <span>${todo.text}</span>
      <small class="category-tag">${label(todo.category ?? 'personal')}</small>
      <small class="priority-tag">${label(getPriority(todo))}</small>
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

// Draws the filter tabs: All + one per category, each with its number of todos.
const renderCategoryFilter = (): void => {
  categoryFilter.innerHTML = '';
  const filters: CategoryFilter[] = ['all', ...CATEGORIES];
  filters.forEach(filter => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `filter-pill${filter === getActiveCategory() ? ' active' : ''}`;
    button.dataset.category = filter;
    button.innerHTML = `${label(filter)} <span class="count">${countByCategory(todos, filter)}</span>`;
    button.addEventListener('click', () => {
      setActiveCategory(filter);
      renderTodos();
    });
    categoryFilter.appendChild(button);
  });
};

// Draws the status tabs (All / Active / Completed) for the todos of the chosen category.
const renderStatusFilter = (list: Todo[]): void => {
  statusFilter.innerHTML = '';
  STATUSES.forEach(status => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `status-tab${status === getActiveStatus() ? ' active' : ''}`;
    button.dataset.status = status;
    button.setAttribute('aria-pressed', String(status === getActiveStatus()));
    button.textContent = `${label(status)} · ${countByStatus(list, status)}`;
    button.addEventListener('click', () => {
      setActiveStatus(status);
      renderTodos();
    });
    statusFilter.appendChild(button);
  });
};