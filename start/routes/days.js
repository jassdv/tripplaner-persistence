var Promise = require('bluebird');
var router = require('express').Router();

var db = require('../models');
var Hotel = db.model('hotel');
var Restaurant = db.model('restaurant');
var Activity = db.model('activity');
var Place = db.model('place');
var Day = db.model('day');

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
	var selectedDay = Day.findOne({
		where: {
			number: req.params.num
		}
	})


	if(Object.keys(req.body)[0] === 'restaurants') {
		var foundRest = Restaurant.findOne({
			where: {
				name: req.body[Object.keys(req.body)[0]]
			}
		})
		Promise.all([selectedDay, foundRest])
		.spread(function(selectedDay, foundRest) {
			selectedDay.addRestaurant(foundRest, {through: 'RestDay'})
		})
		.catch(next)
	} else if(Object.keys(req.body)[0] === 'activities') {
			var foundAct = Activity.findOne({
			where: {
				name: req.body[Object.keys(req.body)[0]]
			}
		})
		Promise.all([selectedDay, foundAct])
		.spread(function(selectedDay, foundAct) {
			selectedDay.addActivity(foundAct, {through: 'ActDay'})
		})
		.catch(next)
	} else if(Object.keys(req.body)[0] === 'hotels') {
		var foundHotel = Hotel.findOne({
					where: {
						name: req.body[Object.keys(req.body)[0]]
					}
				})
				Promise.all([selectedDay, foundHotel])
				.spread(function(selectedDay, foundHotel) {
					selectedDay.setHotel(foundHotel)
				})
				.catch(next)
		}

});


module.exports = router;
