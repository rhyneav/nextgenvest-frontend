const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

const port = process.env.PORT || 3000;

const api = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log('listening on port', port);
});