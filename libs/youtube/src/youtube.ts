import { GaxiosResponse } from 'gaxios';
import { google, youtube_v3 } from 'googleapis';
import * as youtubedl from 'youtube-dl';

export class Youtube {
  private static apiKey: string;
  private static instance: youtube_v3.Youtube;

  public static setApiKey(key: string): void {
    if (Youtube.apiKey) {
      throw new Error('Api key can be set only once');
    }
    Youtube.apiKey = key;
  }

  public static getInstance(): youtube_v3.Youtube {
    if (!Youtube.instance) {
      Youtube.instance = google.youtube({
        auth: Youtube.apiKey,
        version: 'v3',
      });
    }

    return Youtube.instance;
  }

  public static search(query: youtube_v3.Params$Resource$Search$List): Promise<GaxiosResponse<youtube_v3.Schema$SearchListResponse>> {
    if (!query.part || !query.q) {
      throw new Error('\'part\' and \'q\' is required argument');
    }
    return Youtube.getInstance().search.list(query);
  }

  public static download(videoId: string): youtubedl.Youtubedl {
    return youtubedl(`http://www.youtube.com/watch?v=${videoId}`, [
      '--format=18',
    ], {
      cwd: __dirname,
    });
  }
}
