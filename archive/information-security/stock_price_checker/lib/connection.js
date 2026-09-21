// Do not change this file
require('dotenv').config();
const mongoose = require('mongoose');

module.exports = mongoose.connect(process.env.MONGO_URI);