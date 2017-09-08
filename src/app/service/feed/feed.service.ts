import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { News } from './news';
import 'rxjs/Rx';

declare const X2JS: any;

@Injectable()
export class FeedService {
  feed: any;
  x2js: any;

  constructor(private http:Http) {
    this.x2js = new X2JS();
  };

  getRssFeed(feedName: string):  Array<News> {
    var self = this;
    this.feed = this.getFeedUrl(feedName);
    if (this.feed == null) return [];

    let newsArray : News[]=[];

    var result = this.http.get(this.feed.url)
      .subscribe(
        function(response) {
          let json = self.x2js.xml_str2json(response.text());

          // Only care about news items
          let news = json.rss.channel.item;

          for(let story of news){
            if (story.title == story.contentSnippet){
              story.contentSnippet = "";
            }

            let descLength = story.description.length;

            // TODO: Make better


            // for Reuters remove Location (Reuters) -
            let index = story.description.indexOf("(Reuters) -");
            if (index > 0) {
              story.description = story.description.substring(index + 11);
            }

            if (descLength > 85) {
              // TODO: Make this better, can probably use the same overflow CSS from Vizlly
              // Like Get that Reddit bot that shortens news stories and cuts out unnecessary detail ;)
              story.description = story.description.substring(0, 85) + "...";
            }

            let myNews = new News(story.description, story.title, story.contentSnippet, story.pubDate.substring(0,story.pubDate.length-12) + "h", story.link);
            newsArray.push(myNews);
          }
        },
        function(error) { console.log("Error happened: " + error)},
        function() { })
    return newsArray;

  }

  private getFeedUrl(feedName: string) {

    for(let i = 0; i < this.feeds.length; i++) {
      if (this.feeds[i].name == feedName) {
        return this.feeds[i];
      }
    }
    console.log("No Feed found with this name!");
    return null;
  }

  // TODO: Make these configurable
  private feeds: any[] = [
    { name: 'reuters', displayName: "Reuters World News", url: "http://feeds.reuters.com/Reuters/worldNews?format=xml" },
    { name: 'ctv', displayName: "CTV Canada News", url: "http://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009" },
    { name: 'economist', displayName: "The Economist", url: "http://www.economist.com/sections/business-finance/rss.xml" },
    { name: 'ieee', displayName: "IEEE Spectrum", url: "http://spectrum.ieee.org/rss" },
    { name: 'espn', displayName: "ESPN Sports News", url: "http://www.espn.com/espn/rss/news" }
  ]

}
