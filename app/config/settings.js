require('dotenv').config();
const config = {
	appName: process.env.APP_NAME,
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT,
	allowOrigin: process.env.ALLOW_ORIGIN,

	mysql: {
		HOST: process.env.DB_HOST,
		USER: process.env.DB_USER,
		PASSWORD: process.env.PASSWORD,
		DB: process.env.DB_NAME,
		PORT:process.env.MPORT,
		dialect: process.env.DIALECT,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000
		}
    },
    swapi:{
        BASE_URL: process.env.SWAPI_URL
    }
};

module.exports = config;
