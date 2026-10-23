import { Selector } from 'testcafe';

// Locally: BASE_URL=http://localhost:5173 testcafe chrome test/e2e/
// In the pipeline: runs against the /test/ version on Simply.com
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – add and remove').page(BASE_URL);

const input = Selector('#todo-input');
const addButton = Selector('.todo-form button');
const items = Selector('#todo-list li');

test('Adds a new todo to the list', async t => {
  // Arrange
  const text = 'Buy milk';

  // Act
  await t.typeText(input, text).click(addButton);

  // Assert
  await t
    .expect(items.count).eql(1)
    .expect(items.nth(0).find('span').innerText).eql(text);
});

test('Removes a todo from the list', async t => {
  // Arrange
  await t.typeText(input, 'Walk the dog').click(addButton);

  // Act
  await t.click(items.nth(0).find('button').withText('Remove'));

  // Assert
  await t.expect(items.count).eql(0);
});