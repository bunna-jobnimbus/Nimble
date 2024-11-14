# Nimble

A chrome extension containing various improvements for common developer tools.

-   **Github**: Always ignore whitespace, conventional comments, color-code pull requests, visit jira keys.

-   **Jenkins**: Auto-select main branch, reorder dashboard items, require jira ticket.

-   **Jira**: Copy JNID, generate Xcode test.

-   **Swagger**: Codegen swift types from swagger definitions.

# Installation

This project is written in TypeScript, so you'll need to transpile it into JavaScript before it can be used in Chrome. You can do it a number of ways, the project uses [Bun](https://bun.sh/):

-   Build the project with the following command: `npm run build`

    -   This will generate a `dist` folder containing the CSS, JavaScript, and `manifest.json` files needed to load the extension into Chrome.

-   Open Google Chrome and follow these instructions to unpack the extension: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

# Roadmap (TODO)

-   Jira: Hide unused elements
-   Jira: Highlight missing fields
-   Jira: Prefill creation fields (Dev Team)
-   Jira: Ticket warnings (needs to be pointed, missing design, incomplete description, missing tests)
-   Jira: Zen mode
-   Swagger: Add post data to initializer
-   General: Make everything configurable
-   General: Automatically remove unused imports
-   General: Tidy up css selectors
