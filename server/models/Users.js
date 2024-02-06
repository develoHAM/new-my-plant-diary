import dotenv from 'dotenv';
dotenv.config();
const env = process.env;
const DEFAULT_PROFILE_IMG_SRC = env.DEFAULT_PROFILE_IMG_SRC || '/static/img/default_profile_img.jpg';

const UserModel = (sequelize, Sequelize) => {
	return sequelize.define('user', {
		id: {
			type: Sequelize.DataTypes.INTEGER(),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: Sequelize.DataTypes.STRING(),
			allowNull: false,
			unique: true,
		},
		name: {
			type: Sequelize.DataTypes.STRING(10),
			allowNull: false,
		},
		password: {
			type: Sequelize.DataTypes.STRING(500),
			allowNull: false,
		},
		profile_pic: {
			type: Sequelize.DataTypes.STRING(),
			defaultValue: DEFAULT_PROFILE_IMG_SRC,
		},
	});
};

export default UserModel;
