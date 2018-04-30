const express = require('express')
const cors = require('cors')
const app = express();
const authService = require('../services/auth-service')
app.use(cors());

app.route('/auth/sign_in').post(authService.sign_in);