import { expect } from "@playwright/test";
import { test } from "../pages/base";
import { invalidUser, problemUser, validUser } from "../test-data/users";


test.describe("Login Page", () => {

    test.beforeEach(async ({ loginPage }) => {
        // const loginPage = new LoginPage(page);
        // await page.goto("https://saucedemo.com/");
        await loginPage.goto();
    }
    );

    test("Input fields should display as the data that was filled", async ({ loginPage }) => {

        // await page.locator("#user-name").fill("testuser");
        // expect(await page.locator("#user-name").inputValue()).toBe("testuser");

        // await page.locator("#password").fill("test.password");
        // expect(await page.locator("#password").inputValue()).toBe("password");

        await loginPage.fillUserPassword("testuser", "password");
        expect(await loginPage.getUsername()).toBe("testuser");
        expect(await loginPage.getPassword()).toBe("password");
    });

    test("Should show an error message if log in without a username", async ({ loginPage }) => {

        await loginPage.fillUserPassword("", "password");

        await loginPage.clickLoginButton();
        const errorMessage = await loginPage.ErrorMessage();
        console.log(errorMessage);
        expect(errorMessage).toContain(" is required");
        expect(loginPage.isValidUrl()).toBe(true);

    });

    test("Should show an error message if log in without a password", async ({ loginPage }) => {

        await loginPage.fillUserPassword("testuser", "");

        await loginPage.clickLoginButton();
        const errorMessage = await loginPage.ErrorMessage();
        console.log(errorMessage);
        expect(errorMessage).toContain(" is required");
        expect(loginPage.isValidUrl()).toBe(true);
    });

    test("Should show an error message if log in with both fields blanks", async ({ loginPage }) => {
        await loginPage.fillUserPassword("", "");

        await loginPage.clickLoginButton();
        const errorMessage = await loginPage.ErrorMessage();
        console.log(errorMessage);
        expect(errorMessage).toContain(" is required");
        expect(loginPage.isValidUrl()).toBe(true);
    });

    validUser.forEach(({ username, password }) => {
        test(`Should logged in successfully with valid credentials: ${username}`, async ({ loginPage }) => {
            await loginPage.fillUserPassword(username, password);

            await loginPage.clickLoginButton();
            expect(await loginPage.ErrorMessage()).not.toContain(" is required");
            expect(loginPage.isValidUrl()).toBe(false);
        });
    });


    invalidUser.forEach(({ username, password }) => {
        test(`Should logged in fails with an error message when using invalid credentials: ${username}`, async ({ loginPage }) => {
            await loginPage.fillUserPassword(username, password);

            await loginPage.clickLoginButton();
            expect(await loginPage.ErrorMessage()).toContain("Epic sadface");
            expect(loginPage.isValidUrl()).toBe(true);
        });
    });
});