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
            username: res.req.body.username,
            pass: res.req.body.password
        }).then((teacher) => {
            console.log('im in FindOne callback');
            if (!teacher) {
                console.log('auth failed');
                return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
            }
            return res.json({ token: jwt.sign({ name: teacher.name, patronimic: teacher.patronimic, surname: teacher.surname, _id: teacher._id, username: teacher.username }, 'RESTFULAPIs') });
        }).catch((e) =>{
            console.log(e);
            return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
        })
};

exports.loginRequired = (req, res, next) => {
    if (req.teacher) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

exports.verify = (token) =>{
    return new Promise((resolve, reject) =>
    {

            jwt.verify(token, 'RESTFULAPIs', (err, decoded) =>{
                if (err)
                    reject(err);
                resolve(decoded);
            }).catch(e =>{
                reject(e)
            });


    });
};