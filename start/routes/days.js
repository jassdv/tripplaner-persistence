var Promise = require('bluebird');
var router = require('express').Router();

var db = require('../models');
var Hotel = db.model('hotel');
var Restaurant = db.model('restaurant');
var Activity = db.model('activity');
var Place = db.model('place');
var Day = db.model('day');
var RestDay = db.model('RestDay');

//this is where we get when the rout is: /api/days

router.get('/', function(req, res, next) {
	var daysHotel = Day.findAll({include: [Hotel]});
	var daysRest = Day.findAll({include: [Restaurant]});
	var daysAct = Day.findAll({include: [Activity]});
	
	Promise.all([daysHotel,daysRest,daysAct]).spread(function(arr1,arr2,arr3){
		console.log('day-hotel:',arr1);
		console.log('day-rest',arr2);
		console.log('day-act',arr3);
	}).catch(next);


	
})


module.exports = router;