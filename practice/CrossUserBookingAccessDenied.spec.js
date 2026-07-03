const { test, expect, request } = require("@playwright/test");

test("Cross User Booking Access Denied Test", async ({ page }) => {
    //Step 1 — Login as Yahoo user via API  -
    const apiContext = await request.newContext();


    const login = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login", {
        data: {
            email: "kathy.12@yahoo.com",
            password: "Kathy@18"
        }
    });


    await expect(login.ok()).toBeTruthy();
    const loginResponseJson = await login.json();
    const token = loginResponseJson.token;
    // console.log(token);

    //Step 2 — Fetch events via API to get a valid event ID

    const getEvents = await apiContext.get("https://api.eventhub.rahulshettyacademy.com/api/events", {
        headers: {
            'Authorization': `Bearer ${token}`,

        }
    })
    // console.log("Status:", getEvents.status());


    await expect(getEvents.ok()).toBeTruthy();
    const getEventsResponseJson = await getEvents.json();
    const eventId = getEventsResponseJson.data.find(
        event => event.availableSeats > 0
    ).id;
    // console.log("Event ID:", eventId);
    // console.log(getEventsResponseJson.data[0]);

    //Step 3 — Create a booking via API as Yahoo user

    const createBooking = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings", {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: {
            "eventId": eventId,
            "customerName": "Kathy",
            "customerEmail": "kathy.12@yahoo.com",
            "customerPhone": "1234567890",
            "quantity": 1,


        }
    });
    // console.log("Status:", createBooking.status());
    // console.log(await createBooking.text());

    await expect(createBooking.ok()).toBeTruthy();
    const createBookingJson = await createBooking.json();
    const yahooBookingId = createBookingJson.data.id;
    // console.log(yahooBookingId);


    //Step 4 — Login as Gmail user via browser UI

    const GMAIL_USER = {
        email: "kathy.mutyala@gmail.com",
        password: "Kathy@18",
    };

    async function loginAs(page, user) {
        await page.goto("https://eventhub.rahulshettyacademy.com");

        await page.getByRole("textbox", { name: "Email" }).fill(user.email);
        await page.getByRole("textbox", { name: "Password" }).fill(user.password);

        await page.getByRole("button", { name: "Sign In" }).click();
        await page.waitForNavigation({ waitUntil: "networkidle" });

    }



    await loginAs(page, GMAIL_USER);


    //Step 5 — Navigate to Yahoo's booking URL as Gmail user

    await page.goto(
        `https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingId}`,
        {
            waitUntil: "networkidle",
        }
    );
    // console.log(await page.locator("body").innerText());

    //Step 6 — Validate Access Denied

    const accessDeniedMessage = page.getByText("Access Denied");
    await expect(accessDeniedMessage).toBeVisible();
    await expect(
        page.getByText("You are not authorized to view this booking")
    ).toBeVisible();
    //console.log(await accessDeniedMessage.innerText());



});