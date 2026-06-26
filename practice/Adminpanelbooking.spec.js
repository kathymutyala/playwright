const { test, expect } = require('@playwright/test');
const { loginAndGoToBooking } = require('../utils/helper');

test("Admin Panel Booking", async ({ page }) => {
    //Step 1 — Login
    await page.goto("https://eventhub.rahulshettyacademy.com/login");

    const email = page.getByPlaceholder("you@email.com");
    const password = page.getByLabel("Password");
    const login = page.getByRole("button", { name: "Sign In" });
    await email.fill("kathy.mutyala@gmail.com");
    await password.fill("Kathy@18");
    await login.click();
    await expect(page.getByRole("link", { name: "Browse Events →" })).toBeVisible();

    //Step 2 — Create a new event
    await page.goto("https://eventhub.rahulshettyacademy.com/admin/events");
    const eventTitle = `Test Event ${Date.now()}`;
    const title = page.locator("#event-title-input");
    const description = page.locator("#admin-event-form textarea");
    const city = page.getByLabel("City");
    const venue = page.getByLabel("Venue");
    const date = page.getByLabel("Event Date & Time");
    const futureDateValue = () => {
        const date = new Date();
        date.setDate(date.getDate() + 7); // Add 7 days to the current date
        return date.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
    }

    const price = page.getByLabel("Price ($)");
    const seats = page.getByLabel("Total Seats");
    const submitBtn = page.getByRole("button", { name: "+ Add Event" });
    await title.fill("sample event");
    await description.fill("sample event description");
    await city.fill("Delhi");
    await venue.fill("sample venue");
    await date.fill(futureDateValue());
    await price.fill("100");
    await seats.fill("50");
    await submitBtn.click();
    await expect(page.getByText("Event created!")).toBeVisible();

    // Step 3 — Find the event card and capture seats
    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    const eventCard = page.getByTestId("event-card");
    await expect(eventCard.first()).toBeVisible();

    const targetEvent = eventCard.filter({ hasText: "sample event" });
    //- Assert the matched card is visible (timeout 5 seconds)
    await expect(targetEvent).toBeVisible({ timeout: 5000 });
    // console.log(await targetEvent.innerText());

    const seatText = await targetEvent.getByText("seats").textContent();
    const seatsBeforeBooking = parseInt(seatText);
    // console.log(seatsBeforeBooking);

    //Start booking
    const bookNowBtn = targetEvent.getByTestId("book-now-btn");
    await bookNowBtn.click();

    //Fill booking form
    await expect(page.locator("#ticket-count")).toContainText("1");
    const fullName = page.getByLabel("Full Name");
    const emailInput = page.locator("#customer-email");
    const phoneNumber = page.getByPlaceholder("+91 98765 43210");
    await fullName.fill("kathy mutyala");
    await emailInput.fill("kathy.mutyala@gmail.com");
    await phoneNumber.fill("+91 98765 43210");

    const confirmBookingBtn = page.locator(".confirm-booking-btn").click();

    //Verify booking confirmation
    const bookingRefElement = page.locator(".booking-ref").first();
    await expect(bookingRefElement).toBeVisible();

    const bookingReference = (await bookingRefElement.innerText()).trim();
    //console.log(bookingReference);

    //Verify in My Bookings
    const viewBookingLink = page.getByRole("link", { name: "View My Bookings" });
    await viewBookingLink.click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");

    const bookingCards = page.locator("#booking-card");
    await expect(bookingCards.first()).toBeVisible();
    const targetBooking = bookingCards.filter({ hasText: bookingReference });
    await expect(targetBooking).toBeVisible();
    await expect(targetBooking).toContainText("sample event");

    //Verify seat reduction
    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    await expect(eventCard.first()).toBeVisible();
    const updatedEventCard = eventCard.filter({ hasText: "sample event" });
    await expect(updatedEventCard).toBeVisible();
    const updatedSeatText = await updatedEventCard.getByText("seats").textContent();
    const seatsAfterBooking = parseInt(updatedSeatText);
    // console.log(seatsAfterBooking);
    await expect(seatsAfterBooking === seatsBeforeBooking - 1).toBeTruthy();
})

test("Refund Eligibility Test", async ({ page }) => {
    // Step 1 — Login
    await loginAndGoToBooking(page);

    // Step 2 — Book first event with 1 ticket (default)
    await page.goto("https://eventhub.rahulshettyacademy.com/events");

    const eventCard = page.getByTestId("event-card");
    await expect(eventCard.nth(1)).toBeVisible();

    await eventCard.nth(1).getByTestId("book-now-btn").click();

    await page.getByLabel("Full Name").fill("kathy");
    await page.getByLabel("Email").fill("kathy.mutyala@gmail.com");
    await page.getByLabel("Phone Number").fill("+91 98765 43210");

    await page.locator(".confirm-booking-btn").click();

    // Step 3 — Navigate to booking detail
    await page.getByRole("button", { name: "View My Bookings" }).click();

    await expect(page).toHaveURL(
        "https://eventhub.rahulshettyacademy.com/bookings"
    );

    await page.getByRole("button", { name: "View Details" }).nth(1).click();

    await expect(
        page.getByText("Booking Information")
    ).toBeVisible();

    // Step 4 — Validate booking ref
    const bookingRef = (
        await page.locator(".font-mono").first().innerText()
    ).trim();

    const eventTitle = (
        await page.locator("h1").innerText()
    ).trim();

    expect(bookingRef[0]).toBe(eventTitle[0]);

    //Step 5 — Check refund eligibility
    await page.locator("#check-refund-btn").click();
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

    //Step 6 — Validate result

    const refund = page.locator("#refund-result");
    await expect(refund).toBeVisible();
    await expect(refund).toContainText("Eligible for refund.");
    await expect(refund).toContainText("Single-ticket bookings qualify for a full refund");

});

test.only("Group ticket booking is NOT eligible for refund", async ({ page }) => {

    await loginAndGoToBooking(page);
    await page.goto("https://eventhub.rahulshettyacademy.com/events");

    const eventCard = page.getByTestId("event-card");
    await expect(eventCard.nth(1)).toBeVisible();

    await eventCard.nth(1).getByTestId("book-now-btn").click();

    await page.getByLabel("Full Name").fill("kathy");
    await page.getByLabel("Email").fill("kathy.mutyala@gmail.com");
    await page.getByLabel("Phone Number").fill("+91 98765 43210");

    await page.locator(".confirm-booking-btn").click();
    await page.getByRole("button", { name: "+" }).click();
    await page.getByRole("button", { name: "+" }).click();
    // Step 3 — Navigate to booking detail
    await page.getByRole("button", { name: "View My Bookings" }).click();

    await expect(page).toHaveURL(
        "https://eventhub.rahulshettyacademy.com/bookings"
    );

    await page.getByRole("button", { name: "View Details" }).nth(1).click();

    await expect(
        page.getByText("Booking Information")
    ).toBeVisible();

    // Step 4 — Validate booking ref
    const bookingRef = (
        await page.locator(".font-mono").first().innerText()
    ).trim();

    const eventTitle = (
        await page.locator("h1").innerText()
    ).trim();

    expect(bookingRef[0]).toBe(eventTitle[0]);

    //Step 5 — Check refund eligibility
    await page.locator("#check-refund-btn").click();
    await expect(page.locator("#refund-spinner")).toBeVisible();
    await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });

    //Step 6 — Validate result (different assertions)
    const refundResult = page.locator("#refund-result");
    await expect(refundResult).toContainText("Not eligible for refund");
    await expect(refundResult).toContainText("Group bookings (3 tickets) are non-refundable")

});