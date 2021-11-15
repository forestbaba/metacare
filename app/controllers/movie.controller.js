const ResponseManager = require("../utility/responseManager");
const MovieService = require('../service/movie.service')


class MovieController {
    constructor(obj, injector){
        if(obj){
            Object.assign(this,obj)
        }else{
                const {logger, moviesService} = injector.getMany("logger", "moviesService");
                this.logger = logger;
                this.movieService = new MovieService(moviesService);
        }
    }

    async initiateFetchMovies(req, res) {
        try {
            const response = await this.movieService.getAllMovies();
            return ResponseManager.sendResponse(res, response);

        } catch (error) {      

            this.logger.error("An error occurred: ", error.message);
            return ResponseManager.respond(
                res,
                "Request could not be completed, an error occurred",
                ResponseManager.HTTPStatus.INTERNAL_SERVER_ERROR
            );            
        }
    }
    async addComments(req, res) {
        try {
            const response = await this.movieService.addComments(req.body, req);
            return ResponseManager.sendResponse(res, response);

        } catch (error) {      

            this.logger.error("An error occurred: ", error.message);
            return ResponseManager.respond(
                res,
                "Request could not be completed, an error occurred",
                ResponseManager.HTTPStatus.INTERNAL_SERVER_ERROR
            );            
        }
    }
    async fetchComments(req, res) {
        try {
            const response = await this.movieService.getAllComments();
            return ResponseManager.sendResponse(res, response);

        } catch (error) {      

            this.logger.error("An error occurred: ", error.message);
            return ResponseManager.respond(
                res,
                "Request could not be completed, an error occurred",
                ResponseManager.HTTPStatus.INTERNAL_SERVER_ERROR
            );            
        }
    }
    async fetchMovieComments(req, res) {
        try {
            const response = await this.movieService.getCommentByid(req.params);
            return ResponseManager.sendResponse(res, response);

        } catch (error) {      

            this.logger.error("An error occurred: ", error.message);
            return ResponseManager.respond(
                res,
                "Request could not be completed, an error occurred",
                ResponseManager.HTTPStatus.INTERNAL_SERVER_ERROR
            );            
        }
    }
}
module.exports = MovieController;