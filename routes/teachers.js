var express = require('express')
var cors = require('cors')
var app = express();
const findAllTeachers = require('../services/teacher-service');
/* GET users listing. */

app.use(cors());
app.get('/', (req, res, next) => {
  // console.log(findAllTeachers.findAllTeachers());
  findAllTeachers.findAllTeachers().then(result =>{
    res.json(result);
  })
});

module.exports = app;
