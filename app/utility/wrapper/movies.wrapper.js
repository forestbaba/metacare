const axios = require("axios");
const promiseWrapper = require("../promiseWrapper");

class MoviesWrapper{
    constructor(obj, serviceFinder, options) {
        if (obj) {
          Object.assign(this, obj);
        } else {
          const { logger } = serviceFinder.getMany("logger");
          this.logger = logger;
          this.options = options;
        }
      }



  async caller(reqObject) {
    const base = {
      baseURL: this.options.baseURL,
      headers: {
        "Content-Type":"application/json"
      }
    };

    const [err, resp] = await promiseWrapper(axios({
      ...base,
      ...reqObject
    }));

    if (err) {
      // log error and continue
      this.logger.error(`MOVIES_WRAPPER: Error  - ${JSON.stringify(reqObject)}: `, err);
      this.logger.error(`MOVIUES_WRAPPER: Response      : `, resp);
    }

    return [err, resp];
  }

  async initiateFetchAllMoves() {
    const reqObject = {
      url: `/films`,
      method: "GET",
    }
    return await this.caller(reqObject);
  }

}
module.exports = MoviesWrapper;