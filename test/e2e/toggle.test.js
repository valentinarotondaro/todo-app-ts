import { Selector } from 'testcafe';

// Locally: BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/toggle.test.js
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – toggle').page(BASE_URL);

const input = Selector('#todo-input');
const addButton = Selector('.todo-form button');
const items = Selector('#todo-list li');

test('Marks a todo as completed', async t => {
  // Arrange
  await t.typeText(input, 'Buy milk').click(addButton);

  // Act
  await t.click(items.nth(0).find('.toggle'));

  // Assert
  await t.expect(items.nth(0).hasClass('completed')).ok();
});

test('A completed todo stays completed after reload', async t => {
  // Arrange
  await t.typeText(input, 'Walk the dog').click(addButton);
  await t.click(items.nth(0).find('.toggle'));

  // Act
  await t.navigateTo(BASE_URL);

  // Assert
  await t
    .expect(items.nth(0).hasClass('completed')).ok()
    .expect(items.nth(0).find('.toggle').checked).ok();
});