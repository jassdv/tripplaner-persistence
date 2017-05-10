const db = require('./_db');
const Hotel = require('./hotel');
const Restaurant = require('./restaurant');
const Activity = require('./activity');
const Place = require('./place');
const Day = require('./day');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);
Day.belongsTo(Hotel);
Day.belongsToMany(Restaurant,{through: 'RestDay'});
Restaurant.belongsToMany(Day,{through: 'RestDay'});
Day.belongsToMany(Activity,{through: 'ActDay'});
Activity.belongsToMany(Day,{through: 'ActDay'});


module.exports = db;