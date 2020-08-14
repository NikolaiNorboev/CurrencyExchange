const express = require('express');
// const mongo = require('./mongo.js');
const sequelise = require('./sequelize')
const router = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

app.listen(3001);
