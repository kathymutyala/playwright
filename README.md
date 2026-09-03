# Playwright Practice

Practice projects focused on automating common web application scenarios using **Playwright**.

## Projects Covered

- **Calendar Automation**
- **Child Window Automation**

---

# Calendar Automation

Practice project focused on automating different types of date pickers using **Playwright**.

## Sites Covered

- **jQuery UI Datepicker**
- **DemoQA Date Picker**
- **TestMu AI Selenium Playground**

## Scenarios Automated

### jQuery UI Datepicker

- Select a future date
- Select a past date
- Select today's date
- Navigate between months and years
- Handle leap year date — February 29, 2028
- Validate the target date before clicking
- Handle the date picker inside an iframe using `frameLocator()`

### DemoQA Date Picker

- Select a specific year
- Select a specific month
- Select a specific day
- Created a reusable `selectDate()` function
- Used `selectOption()` for year and month selection
- Excluded dates from outside the selected month

### Bootstrap Date Picker

- Select start date
- Select end date
- Fill date fields using placeholders

## Playwright Concepts Practiced

- Locators
- `frameLocator()`
- `selectOption()`
- `getByPlaceholder()`
- `filter()`
- Regular expressions
- `while` loops
- Dynamic calendar navigation
- Assertions with `expect()`
- Reusable functions
- Iframes
- `page.pause()` for debugging

---

# Child Window Automation

Practice project focused on handling **child windows/tabs** using Playwright.

## Site Covered

- **MakeMyTrip**

## Scenarios Automated

- Open a child window from the parent page
- Listen for a new page using `context.waitForEvent("page")`
- Click an element that opens a new tab
- Capture the newly opened page
- Wait for the child page to load
- Retrieve all open pages using `context.pages()`
- Identify and interact with the newly opened tab
- Verify the child page title

## Playwright Concepts Practiced

- `context.waitForEvent("page")`
- `context.pages()`
- Multiple browser pages/tabs
- Child window handling
- `waitForLoadState()`
- Page navigation
- Page title validation
- Browser context management
- Handling popups and new tabs

---

# Frames Automation

Practice project focused on handling **iframes and nested frames** using **Playwright**.

## Sites Covered

- **The Internet**

## Scenarios Automated

### iFrame

- Navigate to the iFrame practice page
- Identify an iframe using its attributes
- Access elements inside an iframe using `frameLocator()`
- Retrieve text from an element inside the iframe
- Validate iframe content using Playwright assertions

### Nested Frames

- Navigate to the Nested Frames practice page
- Identify the parent/top frame
- Access a child frame inside the parent frame
- Locate an element inside the nested frame
- Retrieve and validate text from the nested frame
- Handle multiple levels of frame hierarchy

## Playwright Concepts Practiced

- `frameLocator()`
- Nested frames
- Parent frame → child frame navigation
- Locators inside frames
- `textContent()`
- Assertions with `expect()`
- `waitFor()`
- Iframe identification using DevTools

## Alerts

Practice project focused on handling JavaScript alerts and dialogs using **Playwright**.

### Scenarios Covered

- **JavaScript Alert**
  - Handle a simple alert using `dialog.accept()`.
  - Verify the success message after accepting the alert.

- **JavaScript Confirm**
  - Accept the confirmation dialog using `dialog.accept()`.
  - Dismiss the confirmation dialog using `dialog.dismiss()`.
  - Verify the appropriate result message for both actions.

- **JavaScript Prompt**
  - Enter text into a prompt using `dialog.accept("Hello")`.
  - Verify that the entered text is displayed correctly.

### Concepts Practiced

- `page.on("dialog")`
- `dialog.accept()`
- `dialog.dismiss()`
- Passing text to a JavaScript prompt
- Verifying application behavior after handling dialogs

### File Upload in Playwright

Practiced file upload automation using Playwright's `setInputFiles()` method.

### Topics Covered

- Single file upload
- Uploading a file using a relative path
- Uploading a file using an absolute path
- Using `path.join()` with `__dirname`
- Multiple file upload
- Clearing selected files
- Verifying uploaded/selected files

### Single File Upload

Playwright provides `setInputFiles()` to upload a file directly to a file input.

```javascript
await page.locator("#file-upload").setInputFiles("test-data/sample.txt");
```

### Absolute File Path

Used Node.js `path` module with `__dirname` to create an absolute file path.

```javascript
const path = require("path");

const filePath = path.join(__dirname, "../test-data/sample.txt");

await page.locator("#file-upload").setInputFiles(filePath);
```

### Multiple File Upload

Multiple files can be uploaded by passing an array of file paths to `setInputFiles()`.

```javascript
const filePath1 = path.join(__dirname, "../test-data/sample.txt");

const filePath2 = path.join(__dirname, "../test-data/sample1.txt");

const fileInput = page.locator("#file-upload");

await fileInput.setInputFiles([filePath1, filePath2]);
```

### Verify Multiple Files

The selected files can be verified using the `files` property of the file input.

#### Verify File Count

```javascript
const fileCount = await fileInput.evaluate((input) => input.files.length);

expect(fileCount).toBe(2);
```

#### Verify File Names

```javascript
const fileNames = await fileInput.evaluate((input) =>
  Array.from(input.files).map((file) => file.name),
);

expect(fileNames).toEqual(["sample.txt", "sample1.txt"]);
```

### Clear Selected Files

`setInputFiles([])` can be used to clear all selected files.

```javascript
await fileInput.setInputFiles([]);
```

Verify that the files have been cleared:

```javascript
const fileCount = await fileInput.evaluate((input) => input.files.length);

expect(fileCount).toBe(0);
```
