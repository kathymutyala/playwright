const { test, expect } = require('@playwright/test');

//Select today's date
test("Selecting Future date", async ({ page }) => {

    await page.goto("https://jqueryui.com/datepicker/");

    const targetMonth = "January";
    const targetYear = 2027;
    const targetDay = "6";

    const frame = page.frameLocator(".demo-frame");
    await frame.locator("#datepicker").click();

    let currentMonth = await frame.locator(".ui-datepicker-month").textContent();

    let currentYear = await frame.locator(".ui-datepicker-year").textContent();
    // let currentDate = await frame.locator(".ui-datepicker-today").textContent();
    // console.log(currentDate);

    // await frame.locator(".ui-datepicker-next").click();
    // await frame.locator(".ui-datepicker-prev").click();
    while (currentMonth != targetMonth || currentYear != targetYear) {
        await frame.locator(".ui-datepicker-next").click();
        currentMonth = await frame.locator(".ui-datepicker-month").textContent();
        currentYear = await frame.locator(".ui-datepicker-year").textContent();
    }
    await frame.locator(".ui-state-default").filter({ hasText: new RegExp(`^${targetDay}$`) }).click();
    await page.pause();


})

test("Selecting Past date", async ({ page }) => {
    await page.goto("https://jqueryui.com/datepicker/");
    const targetMonth = "March";
    const targetYear = 2025;
    const targetDay = "12";

    const frame = page.frameLocator(".demo-frame");
    await frame.locator("#datepicker").click();

    let currentMonth = await frame.locator(".ui-datepicker-month").textContent();

    let currentYear = await frame.locator(".ui-datepicker-year").textContent();

    while (currentMonth != targetMonth || currentYear != targetYear) {
        await frame.locator(".ui-datepicker-prev").click();
        currentMonth = await frame.locator(".ui-datepicker-month").textContent();
        currentYear = await frame.locator(".ui-datepicker-year").textContent();

    }
    await frame.locator(".ui-state-default").filter({ hasText: targetDay }).click();
    await page.pause();

})

test("Select today's date", async ({ page }) => {
    await page.goto("https://jqueryui.com/datepicker/");
    const frame = page.frameLocator(".demo-frame");
    await frame.locator("#datepicker").click();
    await frame.locator(".ui-datepicker-month").textContent();
    await frame.locator(".ui-datepicker-year").textContent();
    await frame.locator(".ui-state-highlight").click();
    await page.pause();

})

test("Checking Leap Year", async ({ page }) => {
    await page.goto("https://jqueryui.com/datepicker/");
    const targetYear = 2028;
    const targetMonth = "February";
    const targetDay = "29";

    const frame = page.frameLocator(".demo-frame");
    await frame.locator("#datepicker").click();

    let currentYear = await frame.locator(".ui-datepicker-year").textContent();
    let currentMonth = await frame.locator(".ui-datepicker-month").textContent();

    while (currentYear != targetYear || currentMonth != targetMonth) {
        await frame.locator(".ui-datepicker-next").click();
        currentMonth = await frame.locator(".ui-datepicker-month").textContent();
        currentYear = await frame.locator(".ui-datepicker-year").textContent();

    }
    const targetDate = frame.locator(".ui-state-default").filter({ hasText: targetDay });
    await expect(targetDate).toBeVisible();
    await targetDate.click();
    await page.pause();

})

async function selectDate(page, day, month, year) {
    //open calendar
    await page.locator("#datePickerMonthYearInput").click();

    //select year
    await page.locator(".react-datepicker__year-select").selectOption(year.toString());
    //select month
    await page.locator(".react-datepicker__month-select").selectOption(month.toString());
    //select day
    await page.locator(".react-datepicker__day:not(.react-datepicker__day--outside-month)").filter({ hasText: new RegExp(`^${day}$`) }).click();

}
test("Selecting date from demoqa", async ({ page }) => {
    await page.goto("https://demoqa.com/date-picker");

    await selectDate(page, 13, "July", 2024);
    await page.pause();
});

test("Selecting date in bootstrap date picker", async ({ page }) => {

    await page.goto("https://www.testmuai.com/selenium-playground/bootstrap-date-picker-demo/");
    await page.getByPlaceholder("Start date").fill("06/08/2026");
    await page.getByPlaceholder("End date").fill("09/08/2026");
    await page.pause();
});


