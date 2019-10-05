import { config } from 'dotenv';
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

  it('should search TouTube videos', async () => {
    expect((await Youtube.search({
      part: 'snippet',
      q: '123456',
    })).data.items[0].id.videoId).toBe('DSoqC6ERnYA');
  });
});
