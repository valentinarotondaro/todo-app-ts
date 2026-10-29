import { Selector } from 'testcafe';

// Locally: BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/validation.test.js
// In the pipeline: runs against the /test/ version on Simply.com
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – validation').page(BASE_URL);

const input = Selector('#todo-input');
const addButton = Selector('.todo-form button');
const items = Selector('#todo-list li');
const errorMessage = Selector('#error-message');

test('Shows an error when the todo is too long', async t => {
  // Arrange
  const longText = 'a'.repeat(101);

  // Act
  await t.typeText(input, longText, { paste: true }).click(addButton);

  // Assert
  await t
    .expect(items.count).eql(0)
    .expect(errorMessage.visible).ok()
    .expect(errorMessage.innerText).contains('at most 100 characters');
});

test('Shows an error when the todo already exists', async t => {
  // Arrange
  await t.typeText(input, 'Buy milk').click(addButton);

  // Act
  await t.typeText(input, 'buy MILK').click(addButton);

  // Assert
  await t
    .expect(items.count).eql(1)
    .expect(errorMessage.visible).ok()
    .expect(errorMessage.innerText).contains('already exists');
});
