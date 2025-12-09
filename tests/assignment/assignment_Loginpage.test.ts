import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly browserPage: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly roleSelect: Locator;
  readonly loginButton: Locator;

  constructor(browserPage: Page) {
    this.browserPage = browserPage;
    this.username = browserPage.getByRole('textbox', { name: 'Username' });
    this.password = browserPage.getByRole('textbox', { name: 'Password' });
    this.roleSelect = browserPage.getByLabel('Select Role');
    this.loginButton = browserPage.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.browserPage.goto('https://hoff.is/login/');
    await expect(this.username).toBeVisible();
  }

  async login(username: string, password: string, role: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.roleSelect.selectOption(role);
    await this.loginButton.click();
  }
}

 