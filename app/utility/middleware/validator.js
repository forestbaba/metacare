const { body, param, query, header, oneOf, validationResult  } = require("express-validator");
const ResponseManager = require("../responseManager");

class Validator {


  validate() {
    return async (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors)
        return ResponseManager.respond(res, "Invalid/incomplete input parameter(s)", ResponseManager.HTTPStatus.BAD_REQUEST);
      }
      return next();
    };
  }

  createComment() {     
    return [
      body("comment").isString().isLength({ max:500 }),
      body("user_name").isString().isLength({ min: 2 }),
      body("movie_id").isNumeric(),
    ];
  }

  getComment() {
    return [
      param("movieId").isNumeric(),
    ];
  }
}


module.exports = Validator;
