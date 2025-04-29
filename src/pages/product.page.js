import { Page } from '@playwright/test';
import { removeSlash } from '../utils';

export class ProductPage {
    baseUrl = 'https://www.saucedemo.com'; 
    inventoryUrl = '/inventory.html';
    cartUrl = '/cart.html';

    locatorAddCardButton = '[data-test^="add-to-cart"]';
    locatorRemoveCardButton = '[data-test^="remove"]';
    locatorSortDropdown = 'select[data-test="product-sort-container"]';
    locatorCartIcon = '[data-test="shopping-cart-link"]';

    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto(`${this.baseUrl}${this.inventoryUrl}`);
    }

    async clickAllAddCardButtons() {
        const buttons = await this.page.locator(this.locatorAddCardButton).elementHandles();

        for (let i = 0; i < buttons.length; i++) {
            console.log(`Clicking Add button #${i + 1}`);
            await buttons[i].scrollIntoViewIfNeeded();
            await buttons[i].click();
            await this.page.waitForTimeout(300);
        }
    }

    async clickAllRemoveCardButtons() {
        const buttons = await this.page.locator(this.locatorRemoveCardButton).elementHandles();

        for (let i = 0; i < buttons.length; i++) {
            console.log(`Clicking Remove button #${i + 1}`);
            await buttons[i].scrollIntoViewIfNeeded();
            await buttons[i].click();
            await this.page.waitForTimeout(300);
        }
    }

    /**
     * Select sorting option from the product sort dropdown
     * @param {'az' | 'za' | 'lohi' | 'hilo'} sortOption
     */
    async selectSortOption(sortOption = 'az') {
        const dropdown = this.page.locator(this.locatorSortDropdown);
        await dropdown.selectOption({ value: sortOption });
        console.log(`Selected sort option: ${sortOption}`);
        await this.page.waitForTimeout(500);
    }

    async clickCartIcon() {
        await this.page.locator(this.locatorCartIcon).click();
        await this.page.waitForURL(`${this.baseUrl}${this.cartUrl}`);
    }

    async isValidUrl(path = this.inventoryUrl) {
        const currentUrl = removeSlash(await this.page.url());
        const expectedUrl = removeSlash(`${this.baseUrl}${path}`);
        console.log(`Current URL: ${currentUrl}`);
        console.log(`Expected URL: ${expectedUrl}`);
        return currentUrl === expectedUrl;
    }
}
