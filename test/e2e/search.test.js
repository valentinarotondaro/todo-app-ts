import { Selector } from 'testcafe';

// Locally: BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/search.test.js
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – search').page(BASE_URL);

const input = Selector('#todo-input');
const addButton = Selector('.todo-form button');
const items = Selector('#todo-list li');
const searchInput = Selector('#search-input');
const emptyMessage = Selector('#empty-message');

const addTodos = async t => {
  await t
    .typeText(input, 'Buy milk').click(addButton)
    .typeText(input, 'Write report').click(addButton)
    .typeText(input, 'Buy chocolate').click(addButton);
};

test('Shows only the todos that match the search', async t => {
  // Arrange
  await addTodos(t);

  // Act
  await t.typeText(searchInput, 'buy');

  // Assert
  await t.expect(items.count).eql(2);
});

test('Shows a message when nothing matches', async t => {
  // Arrange
  await addTodos(t);

  // Act
  await t.typeText(searchInput, 'gym');

  // Assert
  await t
    .expect(items.count).eql(0)
    .expect(emptyMessage.innerText).contains('No todos match "gym"');
});