import { Injectable } from '@angular/core';
import { XkcdParser } from './xkcd-parser.service';
import { DilbertParser } from './dilbert-parser.service';

@Injectable()
export class ComicsService {
  constructor(private xkcdParser: XkcdParser, private dilbertParser: DilbertParser) {};

  getComicUrl(): string {
    let idx = Math.floor(Math.random() * this.providers.length);
    console.log(idx);
    //let provider = this.providers[idx];
    return this.xkcdParser.getRandomComicUrl();
  }

  providers: any[] = [
    {
      name: "XKCD", loader: this.xkcdParser
    },
    {
      name: "Dilbert", loader: this.dilbertParser
    }]
}
