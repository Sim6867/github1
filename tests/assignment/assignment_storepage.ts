import { Page, Locator, expect } from '@playwright/test';

export class StorePage {
  readonly browserPage: Page;

  readonly selectProduct: Locator;
  readonly amountInput: Locator;
  readonly addToCartButton: Locator;
  readonly buyMessage: Locator;
  readonly buyButton: Locator;

  readonly nameInput: Locator;
  readonly addressInput: Locator;
  readonly confirmButton: Locator;
  readonly summaryItem: Locator;
  readonly thankYouMessage: Locator;

  constructor(browserPage: Page) {
    this.browserPage = browserPage;

    this.selectProduct = browserPage.getByTestId('select-product');
    this.amountInput = browserPage.getByRole('textbox', { name: 'Amount' });
    this.addToCartButton = browserPage.getByTestId('add-to-cart-button');
    this.buyMessage = browserPage.getByTestId('buy-message');
    this.buyButton = browserPage.getByRole('button', { name: 'Buy' });

    this.nameInput = browserPage.getByRole('textbox', { name: 'Name:' });
    this.addressInput = browserPage.getByRole('textbox', { name: 'Address:' });
    this.confirmButton = browserPage.getByRole('button', { name: 'Confirm Purchase' });

    this.summaryItem = browserPage.getByRole('listitem');
    this.thankYouMessage = browserPage.locator('#name');
  }

  async goToPage() {
    await this.browserPage.goto('/store2');
  }

  async addProductToCart(productId: string, amount: string, expectedProductName: string) {
    await this.selectProduct.selectOption(productId);
    await this.amountInput.click();
    await this.amountInput.fill(amount);
    await this.addToCartButton.click();
    await expect(this.buyMessage).toContainText(`Added ${amount} x ${expectedProductName} to cart.`);
    await this.buyButton.click();
  }

  async confirmPurchase(name: string, address: string, expectedSummary: string) {
    await this.nameInput.fill(name);
    await this.addressInput.fill(address);
    await this.confirmButton.click();
    await expect(this.summaryItem).toContainText(expectedSummary);
    await expect(this.thankYouMessage).toContainText(`Thank you for your purchase, ${name}`);
  }
}
