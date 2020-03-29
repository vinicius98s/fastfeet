import Sequelize, { Model } from 'sequelize';

import sequelize from '@database';
import File from './File';

class Deliveryman extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public avatar_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Deliveryman.init(
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    tableName: 'deliverymen',
    sequelize,
  }
);

Deliveryman.belongsTo(File, { foreignKey: 'avatar_id' });

export default Deliveryman;
