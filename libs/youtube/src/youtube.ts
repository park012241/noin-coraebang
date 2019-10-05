import { google, youtube_v3 } from 'googleapis';

export class Youtube {
  private static apiKey: string;
  private static instance: youtube_v3.Youtube;

  public static setApiKey(key: string) {
    if (Youtube.apiKey) {
      throw new Error('Api key can be set only once');
    }
    Youtube.apiKey = key;
  }

  private static getInstance(): youtube_v3.Youtube {
    if (!Youtube.instance) {
      Youtube.instance = google.youtube({
        auth: Youtube.apiKey,
        version: 'v3',
      });
    }

    return Youtube.instance;
  }

  public static search(query: youtube_v3.Params$Resource$Search$List, part?: {
    snippet?: boolean,
    contentDetails?: boolean,
    fileDetails?: boolean,
    player?: boolean,
    processingDetails?: boolean,
    recordingDetails?: boolean,
    statistics?: boolean,
    status?: boolean,
    suggestions?: boolean,
    topicDetails?: boolean,
  }): Promise<youtube_v3.Schema$SearchListResponse> {
    return new Promise((resolve, reject) => {
      Youtube.getInstance().search.list(Object.assign(part ? Object.assign(query, {
        part: Object.keys(part).reduce((previousValue, currentValue) => {
          return part[currentValue] ? `${previousValue},${currentValue}` : previousValue;
        }, ''),
      }) : query, {
        auth: Youtube.apiKey,
      }), (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result.data);
      });
    });
  }
}
