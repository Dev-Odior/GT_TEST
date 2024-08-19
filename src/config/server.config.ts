import { debug } from 'debug';
import { config } from 'dotenv';

config();

class ServerConfig {
  public NODE_ENV = process.env.NODE_ENV || 'development';

  public PORT = process.env.PORT ? parseInt(process.env.PORT) : 3009;

  public DEBUG = this.NODE_ENV === 'development' ? debug('dev') : console.log;
}

export default new ServerConfig();
