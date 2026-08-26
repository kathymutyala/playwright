# Playwright Practice

Practice projects focused on automating common web application scenarios using **Playwright**.

## Projects Covered

* **Calendar Automation**
* **Child Window Automation**

---

# Calendar Automation

Practice project focused on automating different types of date pickers using **Playwright**.

## Sites Covered

* **jQuery UI Datepicker**
* **DemoQA Date Picker**
* **TestMu AI Selenium Playground**

## Scenarios Automated

### jQuery UI Datepicker

* Select a future date
* Select a past date
* Select today's date
* Navigate between months and years
* Handle leap year date — February 29, 2028
* Validate the target date before clicking
* Handle the date picker inside an iframe using `frameLocator()`

### DemoQA Date Picker

* Select a specific year
* Select a specific month
* Select a specific day
* Created a reusable `selectDate()` function
* Used `selectOption()` for year and month selection
* Excluded dates from outside the selected month

### Bootstrap Date Picker

* Select start date
* Select end date
* Fill date fields using placeholders

## Playwright Concepts Practiced

* Locators
* `frameLocator()`
* `selectOption()`
* `getByPlaceholder()`
* `filter()`
* Regular expressions
* `while` loops
* Dynamic calendar navigation
* Assertions with `expect()`
* Reusable functions
* Iframes
* `page.pause()` for debugging

---

# Child Window Automation

Practice project focused on handling **child windows/tabs** using Playwright.

## Site Covered

* **MakeMyTrip**

## Scenarios Automated

* Open a child window from the parent page
* Listen for a new page using `context.waitForEvent("page")`
* Click an element that opens a new tab
* Capture the newly opened page
* Wait for the child page to load
* Retrieve all open pages using `context.pages()`
* Identify and interact with the newly opened tab
* Verify the child page title

## Playwright Concepts Practiced

* `context.waitForEvent("page")`
* `context.pages()`
* Multiple browser pages/tabs
* Child window handling
* `waitForLoadState()`
* Page navigation
* Page title validation
* Browser context management
* Handling popups and new tabs
