import { MongoClient } from 'mongodb';
import { Database } from './database';

describe('DatabaseLibrary', () => {
  const connectionUri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/noin-coraebang';
  let client: MongoClient;

  it('should throw when connect URI is undefined', () => {
    expect(() => {
      Database.getClient();
    }).toThrow();
  });

  it('should check valid uri', () => {
    expect(() => {
      Database.setConnectUri('');
    }).toThrow();
  });

  it('should protect uri overwrite', () => {
    Database.setConnectUri(connectionUri);
    expect(() => {
      Database.setConnectUri(connectionUri);
    }).toThrow();
  });

  it('should returns MongoClient', () => {
    client = Database.getClient();
    expect(client).toBeInstanceOf(MongoClient);
  });

  it('should return same object again', () => {
    expect(Database.getClient()).toStrictEqual(client);
  });
});
