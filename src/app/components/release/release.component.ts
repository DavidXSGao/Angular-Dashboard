import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ReleaseService} from "./../../service/release/release.service";

@Component({
  selector: 'release',
  styleUrls: ['./release.component.css'],
  templateUrl: './release.component.html',
  providers: [ReleaseService]
})
export class ReleaseComponent implements OnInit {
  // TODO: fix the grossness
  footerImage = require('./../../../assets/img/paperPlane.png');

  releaseInformation = null;
  releaseItems = null;
  updateInterval = null;
  subscription = null;

  constructor(private releaseService: ReleaseService) { };

  ngOnInit() {
    let comp = this;
    this.updateReleaseInformation(this);

    // This Release component will likely be paused at some point on release days.
    // Set an interval to keep updating the release status
    // By default, refresh the status every 5 minutes
    this.updateInterval = setInterval(function() { comp.updateReleaseInformation(comp) }, 5 * 60 * 1000);
  }

  ngOnDestroy() {
    // Clear the update interval when components get switched
    this.subscription.unsubscribe();
    clearInterval(this.updateInterval);
  }


  updateReleaseInformation(comp: ReleaseComponent): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = comp.releaseService.updateStatus().subscribe(function(response) {
      comp.releaseInformation = response.release;
      comp.releaseItems = response.release.releaseItems;
    })
  }

  itemClass(releaseItem: any): string {
    if (releaseItem.status === 'cancelled') return 'cancelled';
    return '';
  }

}
