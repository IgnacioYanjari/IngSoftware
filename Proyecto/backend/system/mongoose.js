const mongoose = require('mongoose');

// const db = 'mongodb://ignacioyanjari:0736@ds139950.mlab.com:39950/alfachile'
const db_dev = 'mongodb://localhost:27017/data';
// const db_dev = '';

const isDev = process.env.NODE_ENV !== 'production';

// Set up Mongoose
mongoose.connect(isDev ? db_dev :db);
mongoose.Promise = global.Promise;
