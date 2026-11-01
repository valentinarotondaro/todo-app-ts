import { Selector } from 'testcafe';

// Locally: BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/priority.test.js
// In the pipeline: runs against the /test/ version on Simply.com
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – priority').page(BASE_URL);

const input = Selector('#todo-input');
const priorityInput = Selector('#priority-input');
const addButton = Selector('.todo-form button');
const items = Selector('#todo-list li');

const addTodoWithPriority = async (t, text, priority) => {
  await t
    .typeText(input, text)
    .click(priorityInput)
    .click(priorityInput.find('option').withAttribute('value', priority))
    .click(addButton);
};

test('Shows the chosen priority on the todo', async t => {
  // Arrange + Act
  await addTodoWithPriority(t, 'Call the doctor', 'high');

  // Assert
  await t
    .expect(items.count).eql(1)
    .expect(items.nth(0).find('.priority-tag').innerText).eql('High');
});

test('Shows high priority todos first', async t => {
  // Arrange
  await addTodoWithPriority(t, 'Water the plants', 'low');
  await addTodoWithPriority(t, 'Pay the rent', 'high');

  // Act: nothing else, the list sorts itself

  // Assert
  await t
    .expect(items.count).eql(2)
    .expect(items.nth(0).find('span').innerText).eql('Pay the rent')
    .expect(items.nth(1).find('span').innerText).eql('Water the plants');
});