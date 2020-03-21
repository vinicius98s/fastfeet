import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

import sequelize from '../../database';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash);
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

User.addHook('beforeSave', async (user: User & { password?: string }) => {
  if (user.password) {
    user.password_hash = await bcrypt.hash(user.password, 8);
  }
});

export default User;
