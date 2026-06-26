const { expect } = require("@playwright/test");

async function loginAndGoToBooking(page) {
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    const email = page.getByPlaceholder("you@email.com");
    const password = page.getByLabel("Password");
    const login = page.getByRole("button", { name: "Sign In" });
    await email.fill("kathy.mutyala@gmail.com");
    await password.fill("Kathy@18");
    await login.click();

    await expect(page.getByRole("link", { name: "Browse Events →" })).toBeVisible();

}

module.exports = { loginAndGoToBooking };
