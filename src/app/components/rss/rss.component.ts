import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FeedService } from './../../service/feed/feed.service';
import { News } from "./../../service/feed/news";


@Component({
  selector: 'rss',
  templateUrl: './rss.component.html',
  styleUrls: ['./rss.component.css'],
  providers: [FeedService]
})


export class RssComponent implements OnInit {

  myNews : Array<News> = [];

  constructor (private FeedService: FeedService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.myNews = this.FeedService.getRssFeed(params['feedName']);
    })
  }
}

