const status = require("./status");
const movies = require('./movies');
const comments = require('./comments');

const allRoutes = (...params) => {
    status(...params);
    movies(...params);
    comments(...params);
}

module.exports = allRoutes;
