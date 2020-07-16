const express = require('express');
const app = express();
const path = require('path');
app.use('/', express.static(__dirname + '/../dist/stp-app'));
let port = 3036
app.listen(process.env.port || port);

console.log(`Running at http://localhost:${port}/`);
