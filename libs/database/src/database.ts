import { MongoClient } from 'mongodb';

export class Database {
  private static client: MongoClient;
  private static mongodbUri: string;

  public static setConnectUri(uri: string): void {
    if (Database.mongodbUri) {
      throw new Error('MongoDB URI can be set only once');
    }
    if (!/^(mongodb:(?:\/{2})?)((\w+?):(\w+?)@|:?@?)(\w+?):(\d+)\/([\w-]+?)$/.test(uri)) {
      throw new Error('Invalid MongoDB Connection URI');
    }
    Database.mongodbUri = uri;
  }

  public static getClient(): MongoClient {
    if (!Database.client) {
      if (!Database.mongodbUri) {
        throw new Error('Set Connection URI First');
      }
      Database.client = new MongoClient(Database.mongodbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    return Database.client;
  }
}
