import { config } from 'dotenv';
import { createWriteStream } from 'fs';
import { youtube_v3 } from 'googleapis/build/src/apis/youtube/v3';
import { Youtube } from './youtube';

let videoInfo: youtube_v3.Schema$SearchResult;

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
    videoInfo = (await Youtube.search({
      part: 'snippet',
      q: '123456',
    })).data.items[0];
    expect(videoInfo.id.videoId).toBe('DSoqC6ERnYA');
  });

  it('should downloads video', () => {
    Youtube.download(videoInfo.id.videoId).on('end', () => {
      return;
    }).pipe(createWriteStream('test.mp4'));
  });
});
