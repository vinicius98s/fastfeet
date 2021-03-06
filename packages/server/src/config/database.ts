require('dotenv').config();

module.exports = {
  dialect: process.env.NODE_ENV === 'test' ? 'sqlite' : 'postgres',
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
