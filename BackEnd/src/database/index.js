import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Transaction from '../models/Transaction';
import User from '../models/User';

const models = [User, Transaction];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));