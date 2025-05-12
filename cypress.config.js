const { defineConfig } = require("cypress");
const fs = require('fs')
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { configureAllureAdapterPlugins } = require("@mmisty/cypress-allure-adapter/plugins");
const EventForwarder = require("./event-forwarder");
const eventForwarder = new EventForwarder();


async function setupNodeEvents(cyOn, config) {

  const on = eventForwarder.on;
  const reporter = configureAllureAdapterPlugins(on, config);

  //settings for environment
  const ENVIRONMENT = config.env.ENVIRONMENT || 'staging'
  const environmentFilename = `./configuration/${ENVIRONMENT}.settings.json`
  console.log('loading %s', environmentFilename)
  const settings = require(environmentFilename)
  if (settings.baseUrl) {
    config.baseUrl = settings.baseUrl
    config.env.baseUrl = settings.baseUrl
  }
  if (settings.fixturesFolder) {
    config.fixturesFolder = settings.fixturesFolder
  }
  if (settings.env) {
    config.env = {
      ...config.env,
      ...settings.env
    }
  }
  console.log('loaded settings for environment %s', ENVIRONMENT)

  //Clean the previos run data
  const filename = 'cypress/fixtures/' + ENVIRONMENT + '/runData.json'
  obj = "{}"
  fs.writeFile(filename, obj, (err) => {
    if (err) throw err;
    else {
      console.log("Data cleaned")
    }
  })

  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  cyOn(
    "file:preprocessor",
    createBundler({
      define: { global: 'window' },
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  // this is to write categories and environment information
  on('before:run', details => {
    reporter?.writeEnvironmentInfo({
      info: {
        "ENVIRONMENT": ENVIRONMENT,
        "USER": config.env.fullName,
        "TAG": config.env.tags,
        // any env info you want to see in report
        os: details.system.osName,
        osVersion: details.system.osVersion,
        browser: details.browser?.displayName + ' ' + details.browser?.version,
      },
    });

    // this can be removed if you don't want to group tests into categories in AllureReport
    // reporter?.writeCategoriesDefinitions({ categories: './allure-error-categories.json' });
  });
  eventForwarder.forward(cyOn);

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  numTestsKeptInMemory: 0,
  experimentalMemoryManagement: true,
  defaultCommandTimeout: 50000,
  pageLoadTimeout: 65000,
  responseTimeout: 50000,
  waitForDataTimeout: 60000,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  includeShadowDom: true,
  video: false,
  retries: {
    runMode: 0,
    openMode: 0
  },
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/features/**/*.feature",
    baseUrl: "https://delta9.slingrs.io/staging/runtime", //default
    chromeWebSecurity: false,
    env: {
      allure: true,
      allureSkipCommands: 'wrap',
      allureResults: 'allure-results',
      omitFiltered: true,
      filterSpecs: true,
    },
  },
});
