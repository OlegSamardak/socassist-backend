const express = require('express');
const cors = require('cors');
const app = express();
const findAllTeachers = require('../services/teacher-service');
const authService = require('../services/auth-service');
app.use(cors());

app.get('/', (req, res, next) => {
  if (!req.headers.authorization){
    res.status(401);
    return;
  }
  authService.verify(req.headers.authorization).then(decoded=>{
      findAllTeachers.findAllTeachers().then(result =>{
          res.json(result);
      },
      err =>{
        res.status(403);
        res.send(err)
      })
  });
});

module.exports = app;
