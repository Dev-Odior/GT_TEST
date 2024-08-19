import { config } from 'dotenv';

config();

class DBConfig {
  public DATABASE_NAME = process.env.DATABASE_NAME;

  public DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

  public DATABASE_USERNAME = process.env.DATABASE_USERNAME;
}

export default new DBConfig();
