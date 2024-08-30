import express, { Application, Router } from 'express';

import { Server } from 'http';

import morgan from 'morgan';

import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import serverConfig from './config/server.config';
import routers from './routers';

import db from './db/db';
import systemMiddleware from './middleware/system.middleware';

import notificationClient from './clients/notification.client';

class App {
  private app: Application;
  private server!: Server;
  private port: number;
  private corsOpts: cors.CorsOptions;

  constructor() {
    this.app = express();
    this.port = serverConfig.PORT;

    this.corsOpts = { origin: '*' };

    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routes(this.app);
    this.DB();

    const signals = ['SIGINT', 'SIGUSR1', 'SIGUSR2', 'SIGTERM'];

    signals.forEach((signal) => {
      process.on(signal, async () => {
        serverConfig.DEBUG(
          `\n server was interrupted with the signal: ${signal}`,
          await this.shutdown(),
        );
      });
    });
  }

  private securityMiddleware(app: Application) {
    app.use(helmet());
    app.use(compression());
    app.use(cors(this.corsOpts));
  }

  private standardMiddleware(app: Application) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    if (
      ['development', 'staging', 'production'].includes(serverConfig.NODE_ENV)
    ) {
      this.app.use(morgan('dev'));
    }
  }

  private routes(app: Application) {
    app.use(routers);
    app.use(systemMiddleware.errorHandler());
  }

  private async DB() {
    await db.connectDB();
  }

  public async start() {
    // THIS WOULD CONNECT TO THE QUEUE IT IS SENDING QUERY TOO //
    notificationClient.init();

    this.server = this.app.listen(this.port, () => {
      serverConfig.DEBUG(`Server is listening at port ${this.port}`);
    });
  }

  private async shutdown() {
    try {
      if (this.server) {
        await new Promise<void>((resolve) => {
          this.server.close();
          resolve();
        });

        await notificationClient.close();
        await db.disconnectDB();
        serverConfig.DEBUG(`Server shutdown successful`);
      }
    } catch (error) {
      serverConfig.DEBUG(`Error shuting down database:${error}`);
    }
  }
}

const app = new App();
app.start();
