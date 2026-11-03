import { Selector } from 'testcafe';

// Locally: BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/progress.test.js
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – progress bar').page(BASE_URL);

const input = Selector('#todo-input');
const categoryInput = Selector('#category-input');
const addButton = Selector('.todo-form button');
const items = Selector('#todo-list li');
const progressBar = Selector('#progress-bar');
const progressLabel = Selector('#progress-label');
const filterPill = category => Selector('.filter-pill').withAttribute('data-category', category);

const addTodoWithCategory = async (t, text, category) => {
  await t
    .typeText(input, text)
    .click(categoryInput)
    .click(categoryInput.find('option').withAttribute('value', category))
    .click(addButton);
};

test('Shows 50% when one of two todos is done', async t => {
  // Arrange
  await addTodoWithCategory(t, 'Buy milk', 'personal');
  await addTodoWithCategory(t, 'Walk the dog', 'personal');

  // Act
  await t.click(items.nth(0).find('.toggle'));

  // Assert
  await t
    .expect(progressBar.getAttribute('aria-valuenow')).eql('50')
    .expect(progressLabel.innerText).contains('1 of 2 done');
});

test('Follows the chosen category', async t => {
  // Arrange
  await addTodoWithCategory(t, 'Write report', 'work');
  await addTodoWithCategory(t, 'Call mum', 'personal');

  // Act
  await t
    .click(filterPill('work'))
    .click(items.nth(0).find('.toggle'));

  // Assert
  await t
    .expect(progressBar.getAttribute('aria-valuenow')).eql('100')
    .expect(progressLabel.innerText).contains('1 of 1 done');
});