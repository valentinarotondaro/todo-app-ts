import { Selector } from 'testcafe';

// Locally: BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/statusFilter.test.js
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – status filter').page(BASE_URL);

const input = Selector('#todo-input');
const addButton = Selector('.todo-form button');
const items = Selector('#todo-list li');
const statusTab = status => Selector('.status-tab').withAttribute('data-status', status);

const addTwoTodosAndCompleteFirst = async t => {
  await t
    .typeText(input, 'Buy milk').click(addButton)
    .typeText(input, 'Walk the dog').click(addButton)
    .click(items.nth(0).find('.toggle'));
};

test('Active shows only the todos that are not done', async t => {
  // Arrange
  await addTwoTodosAndCompleteFirst(t);

  // Act
  await t.click(statusTab('active'));

  // Assert
  await t
    .expect(items.count).eql(1)
    .expect(items.nth(0).find('span').innerText).eql('Walk the dog')
    .expect(statusTab('active').hasClass('active')).ok();
});

test('Completed shows only the todos that are done', async t => {
  // Arrange
  await addTwoTodosAndCompleteFirst(t);

  // Act
  await t.click(statusTab('completed'));

  // Assert
  await t
    .expect(items.count).eql(1)
    .expect(items.nth(0).find('span').innerText).eql('Buy milk')
    .expect(items.nth(0).hasClass('completed')).ok();
});