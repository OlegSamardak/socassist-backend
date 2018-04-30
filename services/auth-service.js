'use strict';

var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    Teacher = mongoose.model('Teacher'),
    teacherService = require('../services/teacher-service');

exports.register = (req, res) => {
    var newTeacher = new Teacher(req.body);
    newTeacher.hash_password = bcrypt.hashSync(req.body.password, 10);
    newTeacher.save((err, teacher) => {
        if (teacher) {
            return res.status(400).send({
                message: err
            });
        } else {
            teacher.hash_password = undefined;
            return res.json(teacher);
        }
    });
};

exports.sign_in = (req, res) => {
    console.log('im in service');
        teacherService.findOneTeacher({
            username: res.req.body.username
        }).then((teacher) => {
            console.log('im in FindOne callback');
            if (!teacher) {
                console.log('auth failed');
                return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
            }
            return res.json({ token: jwt.sign({ name: teacher.name, patronimic: teacher.patronimic, surname: teacher.surname, _id: teacher._id, username: teacher.username }, 'RESTFULAPIs') });
        })
};

exports.loginRequired = (req, res, next) => {
    if (req.teacher) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};