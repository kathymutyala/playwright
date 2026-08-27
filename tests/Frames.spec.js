const { test, expect } = require('@playwright/test');

test("iFrame practice1", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/frames", { waitUntil: "domcontentloaded" });
    await page.locator("a[href='/iframe']").click();
    const frame = page.frameLocator("#mce_0_ifr");
    const text = await frame.locator("body").textContent();
    await expect(frame.locator("body")).toContainText("Your content goes here.");

})
test("Nestedframe Practice", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/frames", { waitUntil: "domcontentloaded" });
    await page.locator("a[href='/nested_frames']").click();
    const topFrame = page.frameLocator("[name='frame-top']");
    const middleFrame = topFrame.frameLocator("[name='frame-middle']")
    const text = await middleFrame.locator("#content").textContent();
    console.log(text);
    await expect(middleFrame.locator("#content")).toContainText("MIDDLE");
})

test.only("Iframe practice on Demoqa", async ({ page }) => {
    await page.goto("https://demoqa.com/frames");
    const frame = page.frameLocator("#frame1");
    const text = await frame.locator("#sampleHeading").textContent();
    console.log(text);
    await expect(frame.locator("#sampleHeading")).toContainText("This is a sample page");
})
