import { Selector } from 'testcafe';

// Locally: BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/categories.test.js
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – categories').page(BASE_URL);

const input = Selector('#todo-input');
const categoryInput = Selector('#category-input');
const addButton = Selector('.todo-form button');
const items = Selector('#todo-list li');
const filterPill = category => Selector('.filter-pill').withAttribute('data-category', category);

const addTodoWithCategory = async (t, text, category) => {
  await t
    .typeText(input, text)
    .click(categoryInput)
    .click(categoryInput.find('option').withAttribute('value', category))
    .click(addButton);
};

test('Shows the chosen category on the todo', async t => {
  // Arrange + Act
  await addTodoWithCategory(t, 'Write report', 'work');

  // Assert
  await t
    .expect(items.nth(0).hasClass('cat-work')).ok()
    .expect(items.nth(0).find('.category-tag').textContent).eql('Work');
});

test('Filters the list by category', async t => {
  // Arrange
  await addTodoWithCategory(t, 'Write report', 'work');
  await addTodoWithCategory(t, 'Call mum', 'personal');

  // Act
  await t.click(filterPill('work'));

  // Assert
  await t
    .expect(items.count).eql(1)
    .expect(items.nth(0).find('span').innerText).eql('Write report')
    .expect(filterPill('work').hasClass('active')).ok();
});