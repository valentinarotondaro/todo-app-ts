import { todos, removeTodo, editTodo } from './todos';
import { getDueStatus } from './features/dueDate';
import { sortByPriority, getPriority } from './features/priority';
import { CATEGORIES, filterByCategory, countByCategory, getActiveCategory, setActiveCategory } from './features/categories';
import type { CategoryFilter } from './features/categories';

// Reference to the list in index.html (DOM + typecasting)
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const categoryFilter = document.getElementById('category-filter') as HTMLDivElement;

// "work" → "Work"
const label = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

// Updates the DOM so it shows the current list of todos.
// First filter by category, then sort by priority (high first).
export const renderTodos = (): void => {
  todoList.innerHTML = '';

  renderCategoryFilter();
  sortByPriority(filterByCategory(todos, getActiveCategory())).forEach(todo => {
    const li = document.createElement('li');
    const status = getDueStatus(todo);
    li.className = `todo-item due-${status} cat-${todo.category ?? 'personal'} priority-${getPriority(todo)}`;
    li.innerHTML = `
      <span>${todo.text}</span>
      <small class="category-tag">${label(todo.category ?? 'personal')}</small>
      <small class="priority-tag">${label(getPriority(todo))}</small>
      ${todo.dueDate ? `<small class="due-date">Due: ${todo.dueDate}${status === 'overdue' ? ' (overdue)' : ''}</small>` : ''}
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
