import { Sequelize } from 'sequelize';

import {
  init as initUser,
  associations as associationUser,
} from './user.model';

import {
  init as initProduct,
  associations as associationProducts,
} from './product.model';

import {
  init as initStock,
  associations as associationStock,
} from './stock.model';

import {
  init as initWarehouse,
  associations as associationWarehouse,
} from './warehouse.model';

export const initModels = (sequelize: Sequelize) => {
  initUser(sequelize);
  initProduct(sequelize);
  initWarehouse(sequelize);
  initStock(sequelize);

  associations();
};

const associations = () => {
  associationUser();
  associationProducts();
  associationStock();
  associationWarehouse();
};
