import {Injectable} from "@angular/core";
import {Http} from '@angular/http';

@Injectable()
export class TwitterService {
  private twitterUrl: string = "http://localhost:3003/twitter/";

  constructor(private http: Http) {}

  getTweets(feedName: string): any {
    let feedUrl;
    if (feedName === "go" || feedName === "ttc") {
      feedUrl = this.twitterUrl + feedName;
    } else {
      // Unsupported feed
      return [];
    }

    /* Get Tweets from the Dashboard Backend (BackBoard - how creative) since Twitter does not support CORS
     * and using OAuth in browser client is unsafe.
     */
    return this.http.get(feedUrl).map(res => res.json());
  }

}
