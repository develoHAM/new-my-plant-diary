'use strict';

import Sequelize from 'sequelize';
import Config from '../config/config.js';
import UserModel from './Users.js';
import PostModel from './Posts.js';

const env = process.env.NODE_ENV || 'development';
const config = Config[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = UserModel(sequelize, Sequelize);
db.Posts = PostModel(sequelize, Sequelize);

db.Users.hasMany(db.Posts, { foreignKey: 'writer_email', sourceKey: 'email' });
db.Posts.belongsTo(db.Users, { foreignKey: 'writer_email', targetKey: 'email' });

export default db;
