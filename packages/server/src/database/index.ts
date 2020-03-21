import { Sequelize } from 'sequelize';

const config = require('../config/database');

export default new Sequelize(config);
