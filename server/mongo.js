const mongoose = require('mongoose');
const config = require('./config.json');


mongoose.connect(
  config.db_connect,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
