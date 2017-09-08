import { Injectable } from '@angular/core';

/* Implement XKCD-specific logic for grabbing the comic URL */
@Injectable()
export class XkcdParser {
  getRandomComicUrl(): string {
    return "http://c.xkcd.com/random/comic";
  }

  // TODO: Add a function to load the above URL and extract the comic URL directly
}
