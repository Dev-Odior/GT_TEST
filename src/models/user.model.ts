import { UserAttributeI } from '@src/interfaces/user.interface';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

import { Role } from '@src/interfaces/user.interface';

import BCRYPTHelper from '@src/utils/helpers/bcrypt.helper';

export class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements UserAttributeI
{
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare role: Role;
  declare email: string;
}

export const init = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      paranoid: true,
      timestamps: true,
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
      scopes: {
        withPassword: {
          include: 'password',
        },
      },
      hooks: {
        beforeCreate(user) {
          if (user.password) {
            user.password = BCRYPTHelper.hashPassword(user.password);
          }
        },
      },
    },
  );
};

export const associations = () => {};
