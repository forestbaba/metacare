const winston = require("winston");
const { format: { combine, colorize, align, label, timestamp, printf } } = winston;

const settings = require("./settings");
const db = require("../models");
const MoviesService = require('../service/movie.service');
const MoviesController = require('../controllers/movie.controller');
const MoviesWrapper = require('../utility/wrapper/movies.wrapper');
const Validator = require("../utility/middleware/validator");


const serviceFinder = require("../utility/servicefinder");

serviceFinder.register("logger", () => {
    const loggings = new (winston.transports.Console)({
      level: settings.env === "development" ? "debug" : "info",
    });
    const transports = [loggings];
    const logger = winston.createLogger({
      transports,
      format: combine(
        colorize(),
        align(),
        label({ label: settings.appName }),
        timestamp(),
        printf(({ level, message, label, timestamp }) => {
          return `${timestamp} [${label}] ${level}: ${message}`;
        })
      )
    });
  
    return {
      info: (msg, data) => logger.info(`${msg} ${data ? (typeof data === "string" ? data : JSON.stringify(data)) : ""}`),
      error: (msg, err) => logger.error(`${msg} ${err ? (typeof err === "string" ? err : JSON.stringify(err)) : ""}`)
    };
});

serviceFinder.register("moviesWrapper", (locator) => {
  db.sequelize.sync();

  
  const d = db.sequelize.sync({}).then(() => {
    console.log("Drop and re-sync db.");
  });
  return new MoviesWrapper(null, locator, {
    baseURL: settings.swapi.BASE_URL
  });
});

serviceFinder.register("mysqlDBClient", (locator) => {
  const logger = locator.get("logger");
  db.sequelize.sync();


  
const d = db.sequelize.sync({}).then(() => {
  console.log("Drop and re-sync db.");
});
  return d;
});
  
//Register Services

serviceFinder.register("moviesService", (locator) => {
  return new MoviesService(null, locator);
});


//Register Controllers

serviceFinder.register("moviesController", (locator) => {
  return new MoviesController(null, locator);
});

serviceFinder.register("validator", () => new Validator());

  module.exports = serviceFinder;
