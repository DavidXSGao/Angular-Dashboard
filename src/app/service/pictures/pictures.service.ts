import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable, Subject} from "rxjs";

@Injectable()
export class PicturesService {
  private imagesUrl = "http://dev-next-app02.vfmltech.com/josh/images.php";

  constructor(private http: Http) { }

  pictureObservable = new Subject();
  pictureList = null;

  getNextPicture(): any {
    // If the pictures list has already been loaded don't ask for the list again
    if (this.pictureList == null) {
      this.http.get(this.imagesUrl).map(res => res.json())
        .subscribe(res => {
          this.pictureList = res.images;
          this.pictureObservable.next(this.getRandomPicture());
        })
    } else {
      this.pictureObservable.next(this.getRandomPicture());
    }

    return this.pictureObservable;
  }

  getRandomPicture(): string {
    return this.pictureList[Math.floor(Math.random() * this.pictureList.length)];
  }
}
