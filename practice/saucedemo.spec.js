const { test, expect } = require('@playwright/test');

test("saucedemo login test", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    const username = page.getByPlaceholder("Username");
    const password = page.getByPlaceholder("Password");
    await username.fill("standard_user");
    await password.fill("secret_sauce");
    // console.log(username);
    // console.log(password);
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    const products = page.locator(".inventory_item");
    const count = await products.count();

    for (let i = 0; i < count; ++i) {
        const productName = await products.nth(i).locator(".inventory_item_name").textContent();
        if (productName === "Sauce Labs Backpack") {
            await products.nth(i).locator("text=Add to cart").click();
            break;
        }
    }

    await expect(page.locator(".shopping_cart_container")).toHaveText("1");
    await page.locator(".shopping_cart_container").click();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    await page.getByRole("button", { name: "Checkout" }).click();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    await page.getByPlaceholder("First Name").fill("abc");
    await page.getByPlaceholder("Last Name").fill("xyz");
    await page.getByPlaceholder("Zip/Postal Code").fill("12345");
    await page.getByRole("button", { name: "Continue" }).click();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
    await page.getByRole("button", { name: "Finish" }).click();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
})

test.only("saucedemo login test with invalid credentials", async ({ page }) => {


    await page.goto("https://www.saucedemo.com/");
    const username = page.getByPlaceholder("Username");
    const password = page.getByPlaceholder("Password");
    await username.fill("standard_userr");
    await password.fill("secret_sauce");
    await page.getByRole("button", { name: "Login" }).click();
    const errorMessage = page.locator(".error-message-container");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
})