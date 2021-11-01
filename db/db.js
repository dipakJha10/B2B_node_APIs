var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/B2B_APIs';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log("Connected to db B2B APP......!!!");
  });

module.exports = db;