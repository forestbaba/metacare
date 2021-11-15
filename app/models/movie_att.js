const settings = require('../config/settings')
module.exports = (sequelize, Sequelize) => {
    const MoviesAttr = sequelize.define('movies', {

      title: {
        type: Sequelize.STRING
      },
      opening_crawl: {
        type: Sequelize.TEXT
      },
       comment_count: {
        type: Sequelize.INTEGER,
        default:0 
      }
    });
    return MoviesAttr;
  };