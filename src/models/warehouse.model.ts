import { WarehouseAttributeI } from '@src/interfaces/warehouse.interface';

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

import { Stock } from './stock.model';

export class WareHouse
  extends Model<InferAttributes<WareHouse>, InferCreationAttributes<WareHouse>>
  implements WarehouseAttributeI
{
  declare id: CreationOptional<number>;
  declare name: string;
  declare capacity: string;
  declare location: string;
}

export const init = (sequelize: Sequelize) => {
  WareHouse.init(
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
      capacity: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'warehouses',
      paranoid: true,
      timestamps: true,
    },
  );
};

export const associations = () => {
  WareHouse.hasOne(Stock, { foreignKey: 'warehouseId' });
};
