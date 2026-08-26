const { test, expect } = require("@playwright/test");

test("Child window handling1", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/windows");
    const childPagePromise = page.context().waitForEvent("page");

    await page.locator('[href*="/windows/new"]').click();
    const childPage = await childPagePromise;

    await page.pause();
});

test("Child window handling2", async ({ page }) => {
    await page.goto("https://demoqa.com/browser-windows");
    const childPagePromise = page.context().waitForEvent("page");
    await page.locator("#tabButton").click();
    const childPage = await childPagePromise;
    console.log(await childPage.title());

    await page.pause();
})
test("child window handling3", async ({ page, context }) => {
    await page.goto("https://automatewithbipin.in/");
    await page.locator('[data-view="newtab"]').click();
    // const popupPromise = page.waitForEvent("popup");
    // await page.locator('a[href*="https://playwright.dev/"]').click();
    // const popup = await popupPromise;
    // const allTabs = context.pages();
    // expect(allTabs.length).toBe(2);

    // const popupPromise = page.waitForEvent("popup");
    // await page.locator('a[href="https://the-internet.herokuapp.com/"]').click();
    // await popupPromise;
    // const allTabs = context.pages();

    // const newTab = allTabs[1];
    // await newTab.waitForLoadState();
    // console.log(await newTab.title());
    const popupPromise = page.waitForEvent("popup");
    await page.locator('a[href="https://github.com/microsoft/playwright"]').click();
    const popup = await popupPromise;
    console.log(await popup.title());

})

test("child window handling4", async ({ page, context }) => {
    await page.goto("https://playwrightlab.github.io/");

    const popupPromise = page.waitForEvent("popup");
    await page.locator("#newTabBtn").click();
    // await page.locator("#popupBtn").click();
    const newPage = await popupPromise;

    await expect(newPage).toHaveURL("https://playwrightlab.github.io/login.html");

})
test.only("Makemytrip childwindow", async ({ page, context }) => {
    await page.goto("https://www.makemytrip.com/hotels");
    // Click outside the login dialog
    await page.mouse.click(100, 100);
    const childPagePromise = context.waitForEvent("page");
    await page.locator(".slideItem").first().click();
    const childpage = await childPagePromise;
    await childpage.waitForLoadState();
    await expect(childpage).toHaveURL(/.*promos.*/);
})


