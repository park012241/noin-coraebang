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

  it('should search TouTube videos', async () => {
    expect((await Youtube.search({
      part: 'snippet',
      q: '123456',
    })).items[0].id.videoId).toBe('DSoqC6ERnYA');
  });
});
