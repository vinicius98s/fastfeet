import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

import sequelize from '../../database';

interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  password?: string;
}

class User extends Model {
  public id!: number;

  public name!: string;

  public email!: string;

  public password_hash!: string;

  public readonly created_at!: Date;

  public readonly updated_at!: Date;

  async checkPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password_hash);
  }
}

User.init(
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
    password_hash: Sequelize.STRING,
  },
  {
    sequelize,
  }
);

User.addHook('beforeSave', async (user: User) => {
  if (user.password) {
    user.password_hash = await bcrypt.hash(user.password, 8);
  }
});

export default User;
