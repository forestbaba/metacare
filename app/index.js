const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");


const API = require("./routes");

const injector = require("./config/Injector");
const logger = injector.get("logger");
const configure = require("./config/settings");

//logger.info(`Node env: ${process.env.NODE_ENV}`);


const app = express();

// app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", configure.allowOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use(morgan("dev"));
 
app.set("port", process.env.APP_PORT);
app.set("env", process.env.NODE_ENV);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  compression({
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  }),
);

app.use(helmet());
// app.disable("x-powered-by");
app.use(methodOverride());

const APIRouter = express.Router();
API(APIRouter, injector);

app.use("/api/movies", APIRouter);

app.use((err, req, res, next) => {
    logger.error("Unexpected error: ", err);
    res.status(500).json({code: 500, message: "An error occurred. Please try again later"});
  });
  
  
  app.listen(configure.port, () => {
    logger.info(`App listening on port: ${configure.port}`);
  });
  
  module.exports = app;