import { Injectable } from '@angular/core';

/* Implement Dilbert-specific logic for grabbing the comic URL */
@Injectable()
export class DilbertParser {
  moment = require("moment");

  private dilbertInceptionDate = this.moment("1989-04-16");

  getRandomComicUrl(): string {
    // Dilbert has no random URL but the URLs are dates
    // Randomly generate a URL since inception
    let today = this.moment();
    let daysAvailable = today.diff(this.dilbertInceptionDate, 'days');

    let daysToAdd = Math.floor(Math.random() * daysAvailable);
    let comicToLoad = this.dilbertInceptionDate.add(daysToAdd, 'days');

    let year = comicToLoad.year();
    let month = this.padDate(comicToLoad.month() + 1);
    let day = this.padDate(comicToLoad.day());

    return `http://dilbert.com/strip/${year}-${month}-${day}`;
  }

  private padDate (n: number): string {
    if (n < 10) {
      return '0' + n;
    }
    return n.toString();
  }

  // TODO: Add a function to load the above URL and extract the comic URL directly
}
