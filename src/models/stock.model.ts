import { StockAttributeI } from '@src/interfaces/stock.interface';

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Product } from './product.model';
import { WareHouse } from './warehouse.model';

export class Stock
  extends Model<InferAttributes<Stock>, InferCreationAttributes<Stock>>
  implements StockAttributeI
{
  declare id: CreationOptional<number>;
  declare productId: number;
  declare warehouseId: number;
  declare quantity: number;

  declare readonly product?: Product;
  declare readonly warehouse?: WareHouse;
}

export const init = (sequelize: Sequelize) => {
  Stock.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'stocks',
      paranoid: true,
      timestamps: true,
    },
  );
};

export const associations = () => {
  Stock.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
  Stock.belongsTo(WareHouse, { foreignKey: 'warehouseId', as: 'warehouse' });
};
