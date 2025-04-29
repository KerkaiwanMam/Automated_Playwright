import { test as base } from "@playwright/test";
import { LoginPage } from "./login.page";
import { ProductPage } from "./product.page"; // <-- นำเข้า

type baseFixture = {
    loginPage: LoginPage;
    productPage: ProductPage; // <-- เพิ่ม
};

export const test = base.extend<baseFixture>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    productPage: async ({ page }, use) => { // <-- เพิ่ม fixture ใหม่
        const productPage = new ProductPage(page);
        await use(productPage);
    },
});
