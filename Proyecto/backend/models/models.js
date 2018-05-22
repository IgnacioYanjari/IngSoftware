import UserSchema from './user.js';
import UserSessionSchema from './userSession.js';

let models = {}
models.UserSchema = UserSchema;
models.userSessionSchema = UserSessionSchema;

module.exports = models;
