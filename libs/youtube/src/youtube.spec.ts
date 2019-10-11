import { config } from 'dotenv';
import { createWriteStream } from 'fs';
import { Youtube } from './youtube';

describe('YouTube', () => {
  beforeEach(() => {
    config();
  });

  it('should sets api key', () => {
    Youtube.setApiKey(process.env.YOUTUBE_API_KEY);
  });

  it('should protect key overwriting', () => {
    expect(() => {
      Youtube.setApiKey('');
    }).toThrow();
  });

  it('should get same instance', () => {
    const first = Youtube.getInstance();
    expect(Youtube.getInstance()).toStrictEqual(first);
  });

  it('should throw error when part is undefined', async () => {
    try {
      await Youtube.search({
        q: '123456',
      });
    } catch (e) {
      expect(() => {
        throw e;
      }).toThrow();
    }
  });

  it('should search YouTube videos', async () => {
    expect((await Youtube.search({
      part: 'snippet',
      q: '123456',
    })).data.items[0].id.videoId).toBe('DSoqC6ERnYA');
  });

  it('should downloads video', () => {
    return new Promise((resolve, reject) => {
      Youtube.download('DSoqC6ERnYA').on('error', (err) => {
        reject(JSON.stringify(err));
      }).on('end', () => {
        resolve();
      }).pipe(createWriteStream('test.mp4'));
    });
  }, 1000000000);
});
