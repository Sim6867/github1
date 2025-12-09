import { test, expect } from '@playwright/test';
import { LoginPage } from './assignment_Loginpage.test';
import { StorePage } from './assignment_storepage';

test.describe('Store UI Tests', () => {

  test('Single product purchase', async ({ page: browserPage }) => {
    const loginPage = new LoginPage(browserPage);
    await loginPage.goto();
    await loginPage.login('myusername', 'mypassword', 'Consumer');

    const storePage = new StorePage(browserPage);
    await storePage.goToPage();

    // Add single product
    await storePage.addProductToCart('1', '2', 'Apple'); // productId, amount, name

    // Confirm purchase
    await storePage.confirmPurchase('John Doe', 'Street 123', 'Apple x 2');
  });

  test('Multiple products purchase', async ({ page: browserPage }) => {
    const loginPage = new LoginPage(browserPage);
    await loginPage.goto();
    await loginPage.login('myusername', 'mypassword', 'Consumer');

    const storePage = new StorePage(browserPage);
    await storePage.goToPage();

    // Add first product
    await storePage.addProductToCart('1', '2', 'Apple');

    // Add second product
    await storePage.addProductToCart('2', '1', 'Banana');

    // Confirm purchase
    await storePage.confirmPurchase('John Doe', 'Street 123', 'Apple x 2');
    await expect(storePage.summaryItem).toContainText('Banana x 1');
  });

});
