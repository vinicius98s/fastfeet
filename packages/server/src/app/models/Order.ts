import Sequelize, { Model } from 'sequelize';

import sequelize from '@database';

import File from './File';
import Deliveryman from './Deliveryman';
import Recipient from './Recipient';

class Order extends Model {
  public id!: number;
  public recipient_id!: number;
  public deliveryman_id!: number;
  public signature_id!: number | null;
  public product!: string;
  public canceled_at!: Date | null;
  public start_date!: Date | null;
  public end_date!: Date | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Order.init(
  {
    product: Sequelize.STRING,
    canceled_at: Sequelize.DATE,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
  },
  {
    sequelize,
  }
);

Order.belongsTo(Recipient, { foreignKey: 'recipient_id' });
Order.belongsTo(Deliveryman, { foreignKey: 'deliveryman_id' });
Order.belongsTo(File, { foreignKey: 'signature_id' });

export default Order;
