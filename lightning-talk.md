# Chrome Extensions: Writing Content Scripts

You can do a ton with Chrome extensions (i.e. Ad blockers, Grammarly, React DevTools, etc...). This talk will focus on content scripts and how you can leverage them to improve the tools you use on a daily basis (primarily GitHub).

# What are content scripts?

-   Content scripts allow you to augment any website with custom CSS and JavaScript.

-   Anatomy (`manifest.json`)

-   Basic Strategy

    -   Listen for DOM changes (`MutationObserver`)

    -   Find an element you want to change (`document.querySelector`)

    -   Mutate it in some way

# Examples

-   Github Extensions

    -   Color-code pull request statuses

    -   Always ignore whitespace

    -   Codegen test case

-   Inherently brittle

    -   Content scripts that largely rely on element `id`s and `class` names can break when a website changes the way they name things.

    -   Sounds scary, but in practice, it rarely happens for enterprise-level applications.

-   Building/Unpacking Extension (if time permits)

# Resources

https://developer.chrome.com/docs/extensions/get-started

https://github.com/bunna-jobnimbus/Nimble
