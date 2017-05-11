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
Day.belongsToMany(Restaurant,{through: 'RestDay'},{onDelete: 'CASCADE'});
Restaurant.belongsToMany(Day,{through: 'RestDay'},{onDelete: 'CASCADE'});
Day.belongsToMany(Activity,{through: 'ActDay'},{onDelete: 'CASCADE'});
Activity.belongsToMany(Day,{through: 'ActDay'},{onDelete: 'CASCADE'});


module.exports = db;