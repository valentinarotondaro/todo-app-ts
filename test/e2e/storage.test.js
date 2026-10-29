import { Selector } from 'testcafe';

// Locally: BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/storage.test.js
// In the pipeline: runs against the /test/ version on Simply.com
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – localStorage').page(BASE_URL);

const input = Selector('#todo-input');
const addButton = Selector('.todo-form button');
const items = Selector('#todo-list li');

test('Keeps a todo after reloading the page', async t => {
  // Arrange
  const text = 'Buy milk';
  await t.typeText(input, text).click(addButton);

  // Act
  await t.navigateTo(BASE_URL);

  // Assert
  await t
    .expect(items.count).eql(1)
    .expect(items.nth(0).find('span').innerText).eql(text);
});

test('A removed todo stays removed after reloading the page', async t => {
  // Arrange
  await t
    .typeText(input, 'Walk the dog').click(addButton)
    .typeText(input, 'Buy milk').click(addButton);
  await t.click(items.nth(0).find('button').withText('Remove'));

  // Act
  await t.navigateTo(BASE_URL);

  // Assert
  await t
    .expect(items.count).eql(1)
    .expect(items.nth(0).find('span').innerText).eql('Buy milk');
});
