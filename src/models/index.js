import Sequelize from 'sequelize';
import configs from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = configs[env];

import Member from './member';

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// db.Member = Member(sequelize, Sequelize);
db.Member = Member.init(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
