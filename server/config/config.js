import dotenv from 'dotenv';
dotenv.config();
const env = process.env;

const Config = {
	development: {
		username: env.MYSQL_USERNAME,
		password: env.MYSQL_PASSWORD,
		database: env.MYSQL_DATABASE,
		host: env.MYSQL_HOST,
		dialect: env.MYSQL_DIALECT,
	},
	production: {
		username: env.RDS_USERNAME,
		password: env.RDS_PASSWORD,
		database: env.RDS_DATABASE,
		host: env.RDS_HOST,
		dialect: env.RDS_DIALECT,
	},
};

export default Config;
