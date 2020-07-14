const express = require('express');
const app = express();
const path = require('path');
app.use('/', express.static(__dirname + '/../dist/stp-app'));
app.listen(process.env.port || 3036);

console.log('Running at Port 3036');
