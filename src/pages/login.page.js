import { Page } from '@playwright/test';
import { removeSlash } from '../utils';

export class LoginPage {
    baseUrl = 'https://www.saucedemo.com';

    locatorUsername = "#user-name";
    locatorPassword = "#password";
    locatorLoginButton = '#login-button';

    locatorErrorMessage = '[data-test="error"]';

    /**
     *  @param {Page} page 
     */
    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto(this.baseUrl);
    }

    async fillUserPassword(username, password) {
        await this.page.locator(this.locatorUsername).fill(username);
        await this.page.locator(this.locatorPassword).fill(password);
    }

    async clickLoginButton() {
        await this.page.locator(this.locatorLoginButton).click();
    }

    async getUsername() {
        return await this.page.locator(this.locatorUsername).inputValue();
    }

    async getPassword() {
        return await this.page.locator(this.locatorPassword).inputValue();
    }

    async ErrorMessage() {
        const errorLocator = this.page.locator(this.locatorErrorMessage);
        try {
            if (await errorLocator.isVisible({ timeout: 1000 })) {
                return await errorLocator.textContent() || '';
            }
        } catch (e) {
            console.warn('No error message found or timeout occurred:', e);
        }
        return '';
    }


    isValidUrl() {
        const url = removeSlash(this.page.url());

        console.log(url, this.baseUrl, this.page.url());
        console.log(url === this.baseUrl);
        return url === this.baseUrl;

    }

}