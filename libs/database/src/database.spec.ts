import { MongoClient } from 'mongodb';
import { Database } from './database';

describe('DatabaseLibrary', () => {
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
    Database.setConnectUri('mongodb://localhost:27017/noin-coraebang');
    expect(() => {
      Database.setConnectUri('mongodb://localhost:27017/noin-coraebang');
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
