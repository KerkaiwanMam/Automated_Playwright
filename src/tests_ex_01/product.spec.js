import { expect } from "@playwright/test";
import { test } from "../pages/base";
import { validUser } from "../test-data/users";

test.describe("Product Page", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    for (const { username, password } of validUser) {
        test(`TC-007 Add and Remove All Items for user: ${username}`, async ({ loginPage, productPage }) => {
            // Step 1: Login
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();

            expect(await loginPage.ErrorMessage()).not.toContain(" is required");
            expect(await productPage.isValidUrl()).toBe(true);

            // Step 2: Add all items to cart
            await productPage.clickAllAddCardButtons();

            // Optional: Verify that "Remove" buttons are visible (means items were added)
            const removeButtons = await productPage.page.locator(productPage.locatorRemoveCardButton);
            expect(await removeButtons.count()).toBeGreaterThan(0);

            // Step 3: Remove all items from cart
            await productPage.clickAllRemoveCardButtons();

            // Optional: Verify no "Remove" buttons are visible after removing
            expect(await removeButtons.count()).toBe(0);
        });
    }


    for (const { username, password } of validUser) {
        test(`TC-008 Sort item: Product should correctly sort items from A to Z - ${username}`, async ({ loginPage, productPage }) => {
            // Step 1: Login
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();

            expect(await loginPage.ErrorMessage()).not.toContain("is required");
            expect(await productPage.isValidUrl()).toBe(true);

            // Step 2: Click sort dropdown (A to Z)
            await productPage.selectSortOption('az'); // ใช้เมธอดใหม่ที่ยืดหยุ่น

            // Step 3: ตรวจสอบว่ารายการสินค้าเรียงตาม A-Z จริง
            const itemTitles = await productPage.page.locator('.inventory_item_name').allTextContents();
            const sortedTitles = [...itemTitles].sort((a, b) => a.localeCompare(b));

            expect(itemTitles).toEqual(sortedTitles);

            console.log('✅ Items sorted A → Z:', itemTitles);
        });
    }


    for (const { username, password } of validUser) {
        test(`TC-009 Sort item: Product should correctly sort items from Z to A - ${username}`, async ({ loginPage, productPage }) => {
            // Step 1: Login
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();

            expect(await loginPage.ErrorMessage()).not.toContain("is required");
            expect(await productPage.isValidUrl()).toBe(true);

            // Step 2: Select sort option "Z to A"
            await productPage.selectSortOption('za');

            // Step 3: Get item titles and verify descending order
            const itemTitles = await productPage.page.locator('.inventory_item_name').allTextContents();
            const sortedTitles = [...itemTitles].sort((a, b) => b.localeCompare(a)); // 🔁 เรียง Z → A

            expect(itemTitles).toEqual(sortedTitles);

            console.log('✅ Items sorted Z → A:', itemTitles);
        })

    }


    for (const { username, password } of validUser) {
        test(`TC-010 Sort item: Product should correctly sort items by price from low to high - ${username}`, async ({ loginPage, productPage }) => {
            // Step 1: Login
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();

            expect(await loginPage.ErrorMessage()).not.toContain("is required");
            expect(await productPage.isValidUrl()).toBe(true);

            // Step 2: Select sort option "Price (low to high)"
            await productPage.selectSortOption('lohi');

            // Step 3: Get item prices and verify ascending order (low to high)
            const itemPrices = await productPage.page.locator('.inventory_item_price').allTextContents();

            // แปลงราคาที่ได้เป็นตัวเลขเพื่อเปรียบเทียบ
            const numericPrices = itemPrices.map(price => parseFloat(price.replace('$', '').trim()));

            // ตรวจสอบว่าราคาถูกเรียงจากต่ำไปสูงจริง
            const sortedPrices = [...numericPrices].sort((a, b) => a - b);

            expect(numericPrices).toEqual(sortedPrices);

            console.log('✅ Prices sorted from low to high:', numericPrices);
        });


    }

    for (const { username, password } of validUser) {
        test(`TC-011 Sort item: Product should correctly sorts items from price high to low - ${username}`, async ({ loginPage, productPage }) => {
            // Step 1: Login
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();

            expect(await loginPage.ErrorMessage()).not.toContain("is required");
            expect(await productPage.isValidUrl()).toBe(true);

            await productPage.selectSortOption('hilo');

            const itemPrices = await productPage.page.locator('.inventory_item_price').allTextContents();

            // แปลงราคาที่ได้เป็นตัวเลขเพื่อเปรียบเทียบ
            const numericPrices = itemPrices.map(price => parseFloat(price.replace('$', '').trim()));

            // ตรวจสอบว่าราคาถูกเรียงจากต่ำไปสูงจริง
            const sortedPrices = [...numericPrices].sort((a, b) => b - a);

            expect(numericPrices).toEqual(sortedPrices);

            console.log('✅ Prices sorted from low to high:', numericPrices);
        });
    }

    for (const { username, password } of validUser) {
        test(`TC-012 Cart icon: Should navigate to the cart page when clicking the cart icon - ${username}`, async ({ loginPage, productPage }) => {
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();
    
            expect(await productPage.isValidUrl()).toBe(true);
    
            await productPage.clickCartIcon();
    
        });
    }
    
});
