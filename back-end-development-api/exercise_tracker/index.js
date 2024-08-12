const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('./routes/api.js');
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false}));

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

mongoose.connect(process.env.DB);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB connected')
})

api(app)

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})