'use strict';

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://localhost/appSample-dev'
    },

    port: 9000,

    seedDB: true,

    RECAPTCHA_PRIVATE_KEY : '6LehawkTAAAAAA7jsbeYHIwZHUXzA3xh7zJlrTMu'
};
