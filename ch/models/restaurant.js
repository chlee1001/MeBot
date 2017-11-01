//var express = require('express');
//var app = express();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var restaurantSchema = new Schema({
		title: String,
		link: String,
		category: String,
		roadAddress: String,
	});	
module.exports = mongoose.model('restaurant', restaurantSchema);