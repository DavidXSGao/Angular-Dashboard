import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { WidgetService } from './service/widget/widgets.service';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WidgetService]
})
export class AppComponent implements OnInit {
  constructor(private widgetService: WidgetService, private router: Router) {};

  subscription = null;

  ngOnInit() {
    let comp = this;
    this.widgetService.enableAutoplay();
    this.subscription = this.widgetService.getWidgetObservable().subscribe(r => {
      comp.router.navigate([r])
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleAutoplay(): void {
    let autoplay = this.widgetService.isAutoplayEnabled();
    if (autoplay) {
      this.widgetService.disableAutoplay();
    } else {
      this.widgetService.enableAutoplay();
    }
  }
}
