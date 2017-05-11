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
	Day.findAll({include: [{all: true, nested: true}]}).then(function(data){
		res.send(data);
	}).catch(next);	
})


router.delete('/:num', function(req,res,next){
	Day.findOne({
		where: {
			number: req.params.num
		}
	})
	.then(function(data){
		return data.destroy();
	})
	.then(function(data){;
		return Day.findAll({where: {
			number: {
				$gt: req.params.num
			}
		}})
	})
	.then(function(arr) {
		arr.forEach(function(day) {
			var newNum = parseInt(day.number) - 1;
			day.update({
				number: newNum
			})
		})
	})
	.then(function(data){
		res.send(data);
	})
	.catch(next);
});


router.put('/:num',function(req,res,next){

	console.log(req.body);
	var selectedDay = Day.findOne({
		where: {
			number: req.params.num
		}
	})

	var selectedHotel = Hotel.findOne({
		where: {
			name: 'Andaz Wall Street'
		}
	})

	Promise.all([selectedHotel, selectedDay])
	.spread(function(selectedHotel, selectedDay){
		return selectedDay.update({
			hotelId: selectedHotel.id
		})
	})
	.catch();

});


module.exports = router;