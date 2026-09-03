const { test, expect } = require('@playwright/test');

test("Download file", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/download");
    const downloadPromise = page.waitForEvent("download");
    await page.locator("a[href='download/upload-me.txt']").click();
    const download = await downloadPromise;
    const filePath = await download.path();
    // console.log(filePath);
    // console.log(download.suggestedFilename());
    await download.saveAs("downloads/" + download.suggestedFilename());
})

test("Download file1", async ({ page, context }) => {
    await page.goto("https://automatewithbipin.com/");

    await page.locator('[data-view="download"]').click();

    const popupPromise = page.waitForEvent("popup");

    await page.getByRole("button", { name: "Go to Download Page" }).click();

    const newPage = await popupPromise;

    await newPage.waitForLoadState();

    const downloadPromise = newPage.waitForEvent("download");

    await newPage.locator("a[href='download/upload-me.txt']").click();

    const download = await downloadPromise;

    await download.saveAs("downloads/upload-me.txt");
})

test("Download file2", async ({ page, context }) => {
    await page.goto("https://automatewithbipin.com/");
    await page.locator('[data-view="download"]').click();

    let downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download Practice File" }).click();
    let download = await downloadPromise;
    expect(await download.failure()).toBeNull();
})