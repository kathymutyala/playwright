const { test, expect } = require('@playwright/test');

test("Actions click test", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/add_remove_elements/");

    await page.getByRole("button", { name: "Add Element" }).click();

    await page.getByRole("button", { name: "Add Element" }).click();
    await page.getByRole("button", { name: "Delete" }).first().click();
})

test("Actions click and double click test", async ({ page }) => {
    await page.goto("https://demoqa.com/buttons");
    await page.getByRole("button", { name: "Double Click Me" }).dblclick();
    await page.getByRole("button", { name: "Right Click Me" }).click({ button: "right" });
    await page.getByRole("button", { name: "Click Me", exact: true }).click();
    const buttons = page.getByRole("button");
    const buttonCount = await buttons.count();
    console.log("Total buttons on the page: " + buttonCount);
});

test("Actions check and uncheck test", async ({ page }) => {
    await page.goto("https://demoqa.com/checkbox");
    await page.locator(".rc-tree-switcher").click();
    await page.getByRole("checkbox", { name: "Select Desktop" }).check();
    await expect(page.locator(".display-result")).toContainText("desktop");
    await expect(page.locator(".display-result")).toContainText("notes");
    await expect(page.locator(".display-result")).toContainText("commands");

    await page.getByRole("checkbox", { name: "Select Desktop" }).uncheck();

    await page.getByRole("checkbox", { name: "Select Documents" }).check();
    await page.getByRole("checkbox", { name: "Select Downloads" }).check();

});

test("Actions select option test", async ({ page }) => {
    await page.goto("https://demoqa.com/select-menu", {
        waitUntil: "domcontentloaded"
    });
    await page.locator("#oldSelectMenu").selectOption({ value: "2" });
    await page.locator("#oldSelectMenu").selectOption({ label: "Purple" });
    await page.locator("#cars").selectOption(["Volvo", "Opel"]);
    const selectedCars = await page.locator("#cars option:checked").allTextContents();
    expect(selectedCars).toEqual(["Volvo", "Opel"]);
    // const allCars = await page.locator("#cars").allTextContents();
    // console.log(allCars);
    //Or to Print one by one
    const allCars = page.locator("#cars");
    const count = await allCars.count();
    for (let i = 0; i < count; i++) {
        const result = await allCars.nth(i).textContent();
        console.log(result);
    }
});

test("Actions hover test", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/hovers");
    await page.locator(".figure").nth(0).hover();
    await expect(page.getByText("name: user1")).toBeVisible();
    await page.getByText("View Profile").nth(0).click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/users/1");
    const users = page.locator(".figure");
    const count = await users.count();
    for (let i = 0; i < count; i++) {
        await users.nth(i).hover();
    }
});