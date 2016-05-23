'use strict';

// Production specific configuration
// =================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/applicationSample-dev'
  },

  seedDB: false,

  RECAPTCHA_PRIVATE_KEY : '6LehawkTAAAAAA7jsbeYHIwZHUXzA3xh7zJlrTMu'
};
