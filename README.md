# Playwright Calendar Automation

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
* Modal handling
* `page.pause()` for debugging
