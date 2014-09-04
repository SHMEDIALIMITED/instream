'use strict';

var express = require('express');
var controller = require('./stream.controller');




var router = express.Router();

router.get('/', controller.verify);
router.post('/', controller.create);

module.exports = router;
