const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://ignacioyanjari:0736@ds139950.mlab.com:39950/alfachile';

// Database Name
const dbName = 'alfachile';

// Use connect method to connect to the server
MongoClient.connect(url,{ useNewUrlParser: true } ,function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
});

// module.exports = MongoClient;
