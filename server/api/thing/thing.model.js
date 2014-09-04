'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  data: Schema.Types.Mixed
});

module.exports = mongoose.model('Thing', ThingSchema);
