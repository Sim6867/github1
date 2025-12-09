import { test, expect } from '@playwright/test';
import { LoginPage } from './assignment_Loginpage.test';
import { StorePage } from './assignment_storepage';

test('verify API prices match UI for multiple products', async ({ page: browserPage }) => {
  // Login
  const loginPage = new LoginPage(browserPage);
  await loginPage.goto();
  await loginPage.login('myusername', 'mypassword', 'Consumer');

  // Navigate to store
  const storePage = new StorePage(browserPage);
  await storePage.goToPage();

  // --- Product 1: Apple ---
  const responseApple = await browserPage.request.get('https://hoff.is/store2/api/v1/price/1');
  const dataApple = await responseApple.json();
  const priceApple = dataApple.price;

  await storePage.addProductToCart('1', '2', 'Apple');
  await expect(storePage.buyMessage).toContainText('Added 2 x Apple to cart.');

  // --- Product 2: Banana ---
  const responseBanana = await browserPage.request.get('https://hoff.is/store2/api/v1/price/2');
  const dataBanana = await responseBanana.json();
  const priceBanana = dataBanana.price;

  await storePage.addProductToCart('2', '1', 'Banana');
  await expect(storePage.buyMessage).toContainText('Added 1 x Banana to cart.');

  // Confirm purchase
  await storePage.confirmPurchase('John Doe', 'Street 123', 'Apple x 2');
  await expect(storePage.summaryItem).toContainText('Banana x 1');
});
