import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {HoneyService} from "./../../service/honey/honey.service";
import {Post} from "./../../service/honey/post";

@Component({
  selector: "honey",
  styleUrls: ['./honey.component.css'],
  templateUrl: './honey.component.html',
  providers: [HoneyService]

})

export class HoneyComponent implements OnInit {
  feedName: string = "";
  myPosts : Array<Post>  = [];


  constructor (private honeyService: HoneyService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.feedName = params['feedName'].charAt(0).toUpperCase() + params['feedName'].slice(1);
      this.myPosts = this.honeyService.getPosts(this.feedName);
    })


  }

}

