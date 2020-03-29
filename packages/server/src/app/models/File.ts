import Sequelize, { Model } from 'sequelize';

import sequelize from '@database';

class File extends Model {
  public id!: number;
  public name!: string;
  public path!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

File.init(
  {
    name: Sequelize.STRING,
    path: Sequelize.STRING,
  },
  {
    sequelize,
  }
);

export default File;
