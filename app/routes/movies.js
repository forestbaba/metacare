const MoviesController = require('../controllers/movie.controller');

const routes = (router, injector) => {
  const validator = injector.get("validator");

  const moviesController = new MoviesController(injector.get('moviesController'));

    router.get("/allMovies", (req, res) => moviesController.initiateFetchMovies(req, res));
    
    router.post("/addComment",  validator.createComment(),
    validator.validate(),
    (req, res) => moviesController.addComments(req, res));

    router.get("/fetchComments", (req, res) => moviesController.fetchComments(req, res));

    router.get("/comments/:movieId", 
    validator.getComment(),
    validator.validate(),
    (req, res) => moviesController.fetchMovieComments(req, res));
};

module.exports = routes;
  