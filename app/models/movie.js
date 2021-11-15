const settings = require('../config/settings')
module.exports = (sequelize, Sequelize) => {
    const Movies = sequelize.define(settings.mysql.DB, {
      movie_id: {
        type: Sequelize.INTEGER
      },
      user_name: {
        type: Sequelize.STRING
      },
       comment: {
        type: Sequelize.STRING 
      },
      public_ip:{
        type:Sequelize.STRING
      }
    });
    return Movies;
  };