import { Selector, ClientFunction } from 'testcafe';

// Locally: BASE_URL=http://127.0.0.1:5173 npx testcafe chrome test/e2e/theme.test.js
const BASE_URL = process.env.BASE_URL || 'https://todo.mintask.dk/test/';

fixture('Todo app – dark mode').page(BASE_URL);

const html = Selector('html');
const themeToggle = Selector('#theme-toggle');
const reload = ClientFunction(() => location.reload());

test('The button switches to dark mode', async t => {
  // Arrange: the app starts in light mode
  await t.expect(html.getAttribute('data-theme')).eql('light');

  // Act
  await t.click(themeToggle);

  // Assert
  await t
    .expect(html.getAttribute('data-theme')).eql('dark')
    .expect(themeToggle.getAttribute('aria-pressed')).eql('true');
});

test('Dark mode stays after reloading the page', async t => {
  // Arrange
  await t.click(themeToggle);

  // Act
  await reload();

  // Assert
  await t.expect(html.getAttribute('data-theme')).eql('dark');
});
npm run dev -- --host 127.0.0.1