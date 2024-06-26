const { defineConfig } = require('cypress')

module.exports = defineConfig({
  // Setup viewport browser like screen solution e.g. screen: 1600*2000, etc.
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  e2e: {
    baseUrl: 'http://localhost:4200',
    // config to ignore run patterns
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],
    // config to run pattern with postfix like .cy or js, etc..
    specPattern: 'cypress/integration/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
