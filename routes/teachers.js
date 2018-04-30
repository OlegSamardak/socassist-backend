const express = require('express')
const cors = require('cors')
const app = express();
const findAllTeachers = require('../services/teacher-service');
app.use(cors());

app.get('/', (req, res, next) => {
  // console.log(findAllTeachers.findAllTeachers());
  findAllTeachers.findAllTeachers().then(result =>{
    res.json(result);
  })
});

module.exports = app;
