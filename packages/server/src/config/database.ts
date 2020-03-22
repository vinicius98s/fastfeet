const isTestEnv = process.env.NODE_ENV === 'test';

require('dotenv').config({
  path: isTestEnv ? '.env.test' : '.env',
});

module.exports = {
  dialect: isTestEnv ? 'sqlite' : 'postgres',
  storage: './src/__tests__/database.sqlite',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
};
