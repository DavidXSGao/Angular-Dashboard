import { Component } from '@angular/core';
import {TwitterService} from "../../service/twitter/twitter.service";

@Component({
  selector: 'transit',
  styleUrls: ['./transit.component.css'],
  templateUrl: './transit.component.html',
  providers: [TwitterService]
})
export class TransitComponent {
  goNotices = [];
  ttcNotices = [];

  goSubscription = null;
  ttcSubscription = null;

  constructor(private twitterService: TwitterService) {};

  ngAfterViewInit() {
    this.goSubscription = this.twitterService.getTweets("go").subscribe(
      res => this.goNotices = res
    );

    this.ttcSubscription = this.twitterService.getTweets("ttc").subscribe(
      res => this.ttcNotices = res
    );
  }

  ngOnDestroy() {
    this.goSubscription = null;
    this.ttcSubscription = null;
  }
}
