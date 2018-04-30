const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;
const ENV_CONST = require('../environment.const');

var db = mongoose.createConnection(ENV_CONST.DB_URL);

var TeacherSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    surname: {
        type: String,
        trim: true
    },
    patronimic: {
        type: String,
        trim: true
    },
    hash_password: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true
    }
});


var Teacher = db.model('Teacher', TeacherSchema);

module.exports = Teacher;