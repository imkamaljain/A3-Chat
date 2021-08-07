const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.URI ?? `mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DB}`;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
}).on('error', (error) => {
    console.log('Error: ', error);
});

module.exports = mongoose;