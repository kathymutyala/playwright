const { test, expect } = require('@playwright/test');

test("Alerts", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    page.on('dialog', async dialog => {
        await dialog.accept();
    });
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.getByText("You successfully clicked an alert")).toBeVisible();

})

test("Alerts cancel", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    page.on('dialog', async (dialog) => {
        await dialog.dismiss();
    })
    await page.getByRole("button", { name: "Click for JS Confirm" }).click();
    await expect(page.getByText("You clicked: Cancel")).toBeVisible();
})

test("Alerts Ok", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    page.on('dialog', async (dialog) => {
        await dialog.accept();
    })
    await page.getByRole("button", { name: "Click for JS Confirm" }).click();
    await expect(page.getByText("You clicked: Ok")).toBeVisible();

})

// page.on() → listens to every dialog that appears.
// page.once() → listens to only the next dialog.
test("Alerts prompt", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    page.once('dialog', async (dialog) => {
        await dialog.accept("Hello");

    })
    await page.getByRole("button", { name: "Click for JS Prompt" }).click();
    await expect(page.getByText("You entered: Hello")).toBeVisible();
    await page.pause();
});
test("verify alert message", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
    page.once('dialog', async (dialog) => {
        expect(dialog.type()).toBe("alert");
        expect(dialog.message()).toBe("I am a JS Alert");
        await dialog.accept();
    })
    await page.getByRole("button", { name: "Click for JS Alert" }).click();
    await expect(page.getByText("You successfully clicked an alert")).toBeVisible();
})