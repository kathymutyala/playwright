const { test, expect } = require('@playwright/test');
const path = require("path")

test('File upload', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.locator("#file-upload").setInputFiles("test-data/sample.txt");
    await page.locator("#file-submit").click();
    await expect(page.locator("#uploaded-files")).toHaveText("sample.txt");

})

test("file upload with absolute path", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload");
    const filePath = path.resolve(__dirname, "../test-data/sample.txt");
    await page.locator("#file-upload").setInputFiles(filePath);
    await page.locator("#file-submit").click();
    await expect(page.locator("#uploaded-files")).toHaveText("sample.txt");
})

test("Multi file upload", async ({ page }) => {
    await page.goto("https://automatewithbipin.com/");
    await page.locator('[data-view="fileupload"]').click();
    const filePath1 = path.join(__dirname, "../test-data/sample.txt");
    const filePath2 = path.join(__dirname, "../test-data/sample1.txt");
    const fileInput = page.locator("#multiFile");
    await fileInput.setInputFiles([filePath1, filePath2]);
    const fileCount = await fileInput.evaluate((input) => input.files.length);
    expect(fileCount).toBe(2);

})

test("Clear file upload", async ({ page }) => {
    await page.goto("https://automatewithbipin.com/");
    await page.locator('[data-view="fileupload"]').click();
    const filePath1 = path.join(__dirname, "../test-data/sample.txt");
    const filePath2 = path.join(__dirname, "../test-data/sample1.txt");
    const fileInput = page.locator("#multiFile");
    await fileInput.setInputFiles([filePath1, filePath2]);
    await fileInput.setInputFiles([]);
    const fileCount = await fileInput.evaluate((input) => input.files.length);
    expect(fileCount).toBe(0);
})