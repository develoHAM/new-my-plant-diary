const PostModel = (sequelize, Sequelize) => {
	return sequelize.define('post', {
		id: {
			type: Sequelize.DataTypes.INTEGER(),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: Sequelize.DataTypes.STRING(100),
		},
		plant: {
			type: Sequelize.DataTypes.STRING(),
		},
		content: {
			type: Sequelize.DataTypes.TEXT(),
		},
		img: {
			type: Sequelize.DataTypes.STRING(),
		},
		date: {
			type: Sequelize.DataTypes.STRING(100),
		},
		writer_email: {
			type: Sequelize.DataTypes.STRING(),
			allowNull: false,
			references: {
				model: 'users',
				key: 'email',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		},
	});
};

export default PostModel;
