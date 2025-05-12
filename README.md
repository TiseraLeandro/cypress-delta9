# Delta9 LIMS Repository

> Cypress 10+ with Cucumber boilerplate project.

### 💻 Topics

Integrated with:

- [x] https://github.com/badeball/cypress-cucumber-preprocessor
- [x] https://github.com/bahmutov/cypress-esbuild-preprocessor
- [x] https://www.npmjs.com/package/multiple-cucumber-html-reporter
- [x] https://github.com/cucumber/json-formatter
- [x] https://github.com/Shelex/cypress-allure-plugin

(+ bundlers: https://github.com/badeball/cypress-cucumber-preprocessor/tree/master/examples)

- ## 💻 Pre-requisites

1. Node JS
2. Optional: Java 8 for Allure Reporter
3. Optional: Json-formatter for Native Reporter option(depends on your OS: https://github.com/cucumber/json-formatter)
4. Add JAVA to your PATH env variable.

## 🚀 Install the project

Install project dependencies with: npm i

* If any error related to cypress appears, run:
  npm install cypress --save-dev

## Run the demo:

1. Standard Execution: npm run cypress:execution:<environment>
2. Native report(with JSON FORMATTER)
3. Allure local Report: 
   1. npm run allure:clear (the clean old data)
   2. npm run cypress:execution:<environment>
   3. npm run allure:report
   4. allure open
   5. You'll get a report

 - ## List of available Tags

 1. @Sanity
 2. @Cannabinoids
 3. @Terpenes
 4. @Moisture
 5. @ResidualSolvents