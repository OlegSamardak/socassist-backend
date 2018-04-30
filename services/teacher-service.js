const MongoClient = require('mongodb').MongoClient;
const ENV_CONST = require('../environment.const');
const mongoose = require('mongoose');
const Teacher = require('../models/teacherModel');
const bcrypt = require('bcrypt');

    findAllTeachers = () =>{
    return new Promise((resolve, reject) =>
    {
        Teacher.find({}, (err, teachers) =>{
            resolve(teachers);
        });
    });
};

findOneTeacher = (findingTeacher) =>{
    return new Promise((resolve, reject) =>
    {
        Teacher.findOne(findingTeacher, (err, foundTeacher) =>{
            bcrypt.compare(findingTeacher.pass, foundTeacher.pass, ()=>{
                console.log(foundTeacher);
                resolve(foundTeacher);
            });

        });
    });
};

module.exports.findOneTeacher = findOneTeacher;
module.exports.findAllTeachers = findAllTeachers;



