const Sequelize = require("sequelize");
const MoviesModel = require('./movie');
const MoviesAttr = require('./movie_att');
const settings = require("../config/settings");


console.log(`==Connect DB: ${settings.mysql.DB} -USER: ${settings.mysql.USER}  -P: ${settings.mysql.PASSWORD}`)
let sequelize = null
if (process.env.CLEARDB_DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
   sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
    dialect:  'mysql',
    protocol: 'mysql',
    logging:  true //false
  });
} else {
   sequelize = new Sequelize(settings.mysql.DB, settings.mysql.USER,settings.mysql.PASSWORD, {
    host: settings.mysql.HOST,
    dialect: settings.mysql.dialect,
    operatorsAliases: false,
  
    pool: {
      max: settings.mysql.pool.max,
      min: settings.mysql.pool.min,
      acquire: settings.mysql.pool.acquire,
      idle: settings.mysql.pool.idle
    }
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.movies = MoviesModel(sequelize, Sequelize);
db.moviesattr = MoviesAttr(sequelize, Sequelize);
module.exports = db;
