const { test, expect } = require("@playwright/test");

test("Calender Validation", async ({ page }) => {

    // const monthNumber = "6";
    // const date = "15";
    // const year = "2027";
    // const expectedList = [monthNumber, date, year];


    // await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    // await page.locator(".react-date-picker").click();
    // await page.locator(".react-calendar__navigation__label__labelText").click();
    // await page.locator(".react-calendar__navigation__label__labelText").click();
    // await page.getByText(year).click();
    // await page.locator(".react-calendar__tile").nth(6).click();
    //or you can write like
    // await page.locator(".react-calendar__tile").nth(Number(month) - 1).click();
    // await page.locator("//abbr[text()='" + date + "']").click();
    const monthNumber = "7";
    const date = "18";
    const year = "2027";
    const expectedList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text()='" + date + "']").click();

    const inputs = page.locator('.react-date-picker__inputGroup__input')

    for (let i = 0; i < expectedList.length; i++) {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);

    }
});