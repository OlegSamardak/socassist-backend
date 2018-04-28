var express = require('express');
var router = express.Router();
const findAllTeachers = require('../services/teacher-service');
/* GET users listing. */
router.get('/', (req, res, next) => {
  // console.log(findAllTeachers.findAllTeachers());
  findAllTeachers.findAllTeachers().then(result =>{
    res.json(result);
  })
});

module.exports = router;
