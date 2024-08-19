import { ProductAttributeI } from '@src/interfaces/product.interface';

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import { Stock } from './stock.model';

export class Product
  extends Model<InferAttributes<Product>, InferCreationAttributes<Product>>
  implements ProductAttributeI
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare price: number;
}

export const init = (sequelize: Sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'products',
      paranoid: true,
      timestamps: true,
    },
  );
};

export const associations = () => {
  Product.hasOne(Stock, { foreignKey: 'productId' });
};
