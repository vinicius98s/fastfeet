import sequelize from '@database';

beforeAll(async () => {
  try {
    await sequelize.sync({ logging: false });
  } catch (e) {
    throw new Error('Error syncing test database');
  }
});

afterAll(async () => {
  try {
    // console.log('Cleaning test database');
    await sequelize.drop({ logging: false });
  } catch (e) {
    console.log('Error cleaning test database. Please undo all migrations');
  }
});
