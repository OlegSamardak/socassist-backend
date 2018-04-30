const express = require('express')
const cors = require('cors')
const app = express();
const authService = require('../services/auth-service');
app.use(cors());

app.post('/auth/sign_in', authService.sign_in);

module.exports = app;