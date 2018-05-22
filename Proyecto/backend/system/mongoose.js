const mongoose = require('mongoose');

// const db = 'mongodb://username:password@url:port/db';
const db = ''
const db_dev = 'mongodb://localhost:27017/data';

const isDev = process.env.NODE_ENV !== 'production';

// Set up Mongoose
mongoose.connect(isDev ? db_dev :db);
mongoose.Promise = global.Promise;
