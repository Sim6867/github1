import { test, expect } from '@playwright/test';
import { LoginPage } from './assignment_Loginpage.test';
import { StorePage } from './assignment_storepage';

test('UI Test 1: User can log in and open store page', async ({ page: browserPage }) => {
  const login = new LoginPage(browserPage);
  await login.goto();
  await login.login('myusername', 'mypassword', 'Consumer');

  const store = new StorePage(browserPage);
  await store.goToPage();

  await expect(browserPage).toHaveURL(/store2/);
});
