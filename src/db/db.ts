import { Sequelize } from 'sequelize';

import dbConfig from '@src/config/db.config';

import { initModels } from '@src/models';
import serverConfig from '@src/config/server.config';

class DB {
  public connection: Sequelize;

  public async connectDB() {
    try {
      this.connection = new Sequelize(
        dbConfig.DATABASE_NAME,
        dbConfig.DATABASE_USERNAME,
        dbConfig.DATABASE_PASSWORD,
        {
          dialect: 'mysql',
        },
      );

      initModels(this.connection);

      // CHOOSE YOUR DEMONS
      // await this.connection.sync({});
      // await this.connection.sync({ force: true });
      // await this.connection.sync({ alter: true });

      serverConfig.DEBUG(`Connection to the database successful`);
    } catch (error) {
      serverConfig.DEBUG(`Error connecting to the database: ${error}`);
    }
  }

  public async disconnectDB() {
    if (this.connection) {
      this.connection.close();
      serverConfig.DEBUG(`Server disconnected successfully`);
    }
  }
}

export default new DB();
