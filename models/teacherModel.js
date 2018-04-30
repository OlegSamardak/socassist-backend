const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

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
    pass: {
        type: String,
        trim: true
    },
});

TeacherSchema.methods.comparePassword = () =>{
    return bcrypt.compareSync(password, this.password)
};

mongoose.model('Teacher', TeacherSchema);