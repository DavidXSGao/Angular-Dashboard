import {Component, OnInit} from '@angular/core';
import { PicturesService } from '../../service/pictures/pictures.service';

@Component({
  selector: 'pictures',
  styleUrls: ['./pictures.component.css'],
  templateUrl: './pictures.component.html',
  providers: [PicturesService]
})

export class PicturesComponent implements OnInit {
  private pictureURL:string;
  private subscription;
  private imageUpdateInterval = null;
  private hostname: string = "http://dev-next-app02.vfmltech.com";

  constructor(private picturesService: PicturesService) {
  }

  ngOnInit() {
    let comp = this;

    // If configured, set a timer to rotate images
    // TODO: externalize config
    this.imageUpdateInterval = setInterval(function() {comp.picturesService.getNextPicture();}, 22500);

    this.subscription = this.picturesService.getNextPicture().subscribe(res => {
      this.pictureURL = res;
  })};

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.imageUpdateInterval);
  }
}
