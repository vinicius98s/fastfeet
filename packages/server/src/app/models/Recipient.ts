import Sequelize, { Model } from 'sequelize';

import sequelize from '@database';

class Recipient extends Model {
  public id!: number;
  public name!: string;
  public sreet!: string;
  public number!: number;
  public complement?: string | null;
  public city!: string;
  public state!: string;
  public zip_code!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Recipient.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    complement: Sequelize.STRING,
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    zip_code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

export default Recipient;
