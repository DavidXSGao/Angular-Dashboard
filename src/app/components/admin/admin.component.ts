import { Component } from '@angular/core';
import { ReleaseService } from "../../service/release/release.service";
import {WidgetService} from "../../service/widget/widgets.service";

@Component({
  selector: 'admin',
  styleUrls: ['./admin.component.css'],
  templateUrl: './admin.component.html',
  providers: [ReleaseService]
})
export class AdminComponent {
  constructor(private releaseService: ReleaseService, private widgetService: WidgetService) { };

  release = {'releaseItems': []};
  error = "";
  success = "";

  ngOnInit() {
    // Disable the autoplay
    this.widgetService.disableAutoplay();

    // Load the release items from the server
    this.releaseService.updateStatus().subscribe(res => {
      this.release = res.release;
    }, error => {
      this.error = "An error occurred";
      console.log(error);
    });
  }

  ngOnDestroy() {
    // Re-enable the autoplay on the components
    this.widgetService.enableAutoplay();
  }

  // TODO: need a way to reorder components

  save() {
    this.releaseService.postReleasePlan(this.release).subscribe(res => {
      this.release = res.release;
      this.error = "";
      this.success = "Release plan was successfully saved";
    }, error => {
      this.error = "Error occurred";
      this.success = "";
      console.log(error);
    });
    let comp = this;
    setTimeout(function() { comp.clearMessages() }, 5000);
  }

  createNewItem() {
    let newItem = {
      "component": "",
      "subcomponents": "",
      "scheduledTime": "",
      "status": ""
    }

    this.release.releaseItems.push(newItem);
  }

  clearMessages() {
    this.error = "";
    this.success = "";
  }
}
