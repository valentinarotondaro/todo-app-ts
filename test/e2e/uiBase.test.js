import { Selector } from 'testcafe';

// Locally: BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/uiBase.test.js
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – base UI').page(BASE_URL);

const input = Selector('#todo-input');
const addButton = Selector('.todo-form button');
const items = Selector('#todo-list li');
const greeting = Selector('#greeting');
const today = Selector('#today');
const progressPercent = Selector('#progress-percent');

test('Shows a greeting and today\'s date', async t => {
  // Arrange + Act: open the app

  // Assert
  await t
    .expect(greeting.innerText).match(/^Good (morning|afternoon|evening)!$/)
    .expect(today.innerText).notEql('');
});

test('Shows the progress as a big percentage', async t => {
  // Arrange
  await t
    .typeText(input, 'Buy milk').click(addButton)
    .typeText(input, 'Walk the dog').click(addButton);

  // Act
  await t.click(items.nth(0).find('.toggle'));

  // Assert
  await t.expect(progressPercent.innerText).eql('50%');
});