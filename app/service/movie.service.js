const MoviesWrapper = require('../utility/wrapper/movies.wrapper');
const ResponseManager = require('../utility/responseManager');
const { HTTPStatus } = ResponseManager;
const DB = require('../models');

class MovieService {
	constructor(obj, injector) {
		if (obj) {
			Object.assign(this, obj);
		} else {
			const { logger, moviesWrapper } = injector.getMany('logger', 'moviesWrapper');
			this.logger = logger;
			//this.mysqlDBHelper = new MongoDBHelper(mongoDBClient);
			this.moviesWrapper = new MoviesWrapper(moviesWrapper);
		}
	}

	async getAllMovies() {
		const datas = await this.moviesWrapper.initiateFetchAllMoves();
		if (datas.length === 0) {
			this.logger.error('Error fetching Movies via SWAPI API:', buyError);
			return ResponseManager.generateErrorMessage(
				'Request could not be completed due to an error',
				HTTPStatus.INTERNAL_SERVER_ERROR
			);
		}

		const { status, statusText, data } = datas[1];
		if (statusText !== 'OK') {
			this.logger.error('Failure with SWAPI API :', data);
			return ResponseManager.generateErrorMessage(`Transaction failed: ${message}`, HTTPStatus.BAD_REQUEST);
		}
        let refined = [];
        for (const value in data.results) {
    
            // Save comment to the database
            const x = await this.check(data.results[value].episode_id)
            refined.push(Object.assign({title:data.results[value].title, 
            opening_crawl: data.results[value].opening_crawl, comment_count: x, release_date:data.results[value].release_date }))
        }
		return ResponseManager.generateMessage(`movies fetched successfully`, HTTPStatus.OK, { movies: refined});
	}

	async check(episode_id) {
		const Movies = DB.movies;
		return Movies.count({ where: { movie_id: episode_id} }).then((value) => {
			return value;
		});
	}
	async addComments(requestBody, requestParams) {
		const { movie_id, user_name, comment } = requestBody;
		const Movies = DB.movies;
		let ip = ''+ requestParams.ip || requestParams.connection || requestParams.socket.remoteAddress || requestParams.connection.socket.remoteAddress;

		const commentBody = {
			comment: comment,
			user_name: user_name,
			movie_id: movie_id,
			public_ip:ip
		};

		// Save comment to the database
		const newComment = await Movies.create(commentBody);
		return ResponseManager.generateMessage(`comment added successfully`, HTTPStatus.OK, { movies: newComment });
	}

	async getAllComments() {
		const Movies = DB.movies;
		const getAllComments = await Movies.findAll({});
		return ResponseManager.generateMessage(`movies comment fetched successfully`, HTTPStatus.OK, { comments: getAllComments});
	}
	async getCommentByid(requestParams) {

		const Movies = DB.movies;
		const {movieId} = requestParams

		const allComments = await Movies.findAll({where:{movie_id:movieId}});
		return ResponseManager.generateMessage(`movies fetched successfully`, HTTPStatus.OK, { comments: allComments});
	}
}
module.exports = MovieService;
