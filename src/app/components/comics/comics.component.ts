import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ComicsService } from './../../service/comics/comics.service';
import { XkcdParser } from './../../service/comics/xkcd-parser.service';
import { DilbertParser } from '../../service/comics/dilbert-parser.service';

@Component({
  selector: 'comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css'],
  providers: [ComicsService, XkcdParser, DilbertParser]
})
export class ComicsComponent implements OnInit {
  trustedUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private comicsService: ComicsService) { }

  // TODO: Add more comics :) (Dilbert)


  ngOnInit() {
    // Load a random comic
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.comicsService.getComicUrl());
  }
}
