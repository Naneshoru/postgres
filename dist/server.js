"use strict";

var express = require('express');
var routes = require('./routes');
var setupSwagger = require('./swagger');
var PORT = process.env.PORT || '3000';
var app = express();
app.use(express.json());
app.use('/api', routes);
setupSwagger(app);
app.listen(PORT, function () {
  console.log('Listening on port ', PORT);
});