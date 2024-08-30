import serverConfig from '@src/config/server.config';
import amqp from 'amqplib';

class NotificationClient {
  private channel: amqp.Channel;
  private connection: amqp.Connection;

  public readonly queue = 'messages';

  public async init() {
    await this.connectWithRetry();
  }

  public async connectWithRetry() {
    let backoff = 1000;
    let maxBackoff = 30000;
    while (true) {
      try {
        this.connection = await amqp.connect(serverConfig.RABBIT_MQ);
        this.channel = await this.connection.createChannel();

        this.channel.assertQueue(this.queue, {
          durable: true,
        });

        serverConfig.DEBUG(`Server connected to the Rabbit MQ server`);

        break;
      } catch (error) {
        serverConfig.DEBUG(
          `Error connecting to Rabbit MQ, retrying in ${
            backoff / 1000
          } seconds...`,
        );

        await new Promise((resolve) => setTimeout(resolve, backoff));
        backoff = Math.min(backoff * 2, maxBackoff);
      }
    }
  }

  public async sendNotification(
    notificationType: string,
    notification: object,
  ) {
    if (this.channel) {
      try {
        const data = { notificationType, ...notification };

        this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data)));
      } catch (error) {
        serverConfig.DEBUG(`Failed to send email ${error}`);

        await this.connectWithRetry();
        return this.sendNotification(notificationType, notification);
      }

      // IF THE MESSAGE WAS SUCCESSFULLY SEND RETURN TRUE //
      return true;
    }
  }

  public async close() {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }

    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }

    serverConfig.DEBUG('RabbitMQ closed successfully!!');
  }
}

export default new NotificationClient();
