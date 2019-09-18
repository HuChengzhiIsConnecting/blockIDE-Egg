// app.js
module.exports = app => {
    app.sessionStore = {
      // support promise / async
      async get (key) {
        // return value;
      },
      async set (key, value, maxAge) {
        // set key to store
      },
      async destroy (key) {
        // destroy key
      },
    };
  };