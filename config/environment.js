/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'v-tracker',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',

    firebase: {
      apiKey: "AIzaSyCPuqVe8Oc_DL18h_3GvrwvWyaJJfBrqSk",
      authDomain: "v-tracker-2a809.firebaseapp.com",
      databaseURL: "https://v-tracker-2a809.firebaseio.com",
      projectId: "v-tracker-2a809",
      storageBucket: "v-tracker-2a809.appspot.com",
      messagingSenderId: "787938058059"
    },

    torii: {
      sessionServiceName: 'session',
    },

    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' apis.google.com",
      'frame-src': "'self' https://*.firebaseapp.com",
      'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com",
      'default-src': "'none'",
      'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com",
      'font-src': "'self' fonts.gstatic.com",
      'img-src': "'self' data:",
      'media-src': "'self'"
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
