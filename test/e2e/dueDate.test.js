import { Selector } from 'testcafe';

// Locally: BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/dueDate.test.js
// In the pipeline: runs against the /test/ version on Simply.com
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – due date').page(BASE_URL);

const input = Selector('#todo-input');
const dueDateInput = Selector('#due-date-input');
const addButton = Selector('.todo-form button');
const items = Selector('#todo-list li');

test('Shows the due date of a todo', async t => {
  // Arrange
  const date = '2099-12-31';

  // Act
  await t
    .typeText(input, 'Finish the report')
    .typeText(dueDateInput, date)
    .click(addButton);

  // Assert
  await t
    .expect(items.count).eql(1)
    .expect(items.nth(0).find('.due-date').innerText).contains(`Due: ${date}`)
    .expect(items.nth(0).hasClass('due-overdue')).notOk();
});

test('Marks a todo with a past due date as overdue', async t => {
  // Arrange
  const date = '2020-01-01';

  // Act
  await t
    .typeText(input, 'Pay the bill')
    .typeText(dueDateInput, date)
    .click(addButton);

  // Assert
  await t
    .expect(items.nth(0).hasClass('due-overdue')).ok()
    .expect(items.nth(0).find('.due-date').innerText).contains('(overdue)');
});
