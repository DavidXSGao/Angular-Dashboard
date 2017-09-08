import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable()
export class WidgetService {

  private activeWidgetRoute;

  private currentWidgetIndex: number = 0;
  private autoplay: boolean = false;
  private defaultDuration = 45000;
  private interval = null;

  getDestinationWidget(): any {
    let destWidget;
    do {
      destWidget = this.getNextWidget();
    } while (destWidget.disabled === true);

    // Set interval to proceed to the next one
    let s = this;
    if (s.autoplay) {
      clearInterval(s.interval);
      s.interval = setInterval(() => {
          s.getDestinationWidget();
          s.activeWidgetRoute.next(s.getWidgetRoute());
      }, s.getDuration(s.widgets[s.currentWidgetIndex]));
    }

    return destWidget;
  }

  // Get the next potential widget of the widgets list. Note: May be disabled.
  getNextWidget(): any {
    let current = this.widgets[this.currentWidgetIndex];
    // If the current widget has no children or we are already at the end
    if (current.children.length == 0 || current.children.length == current.activeChild + 1) {
      // Return the next widget
      this.currentWidgetIndex = (this.currentWidgetIndex + 1) % this.widgets.length;
      current = this.widgets[this.currentWidgetIndex];
      current.activeChild = 0;
    } else {
      // Return this widget with the next child
      current.activeChild += 1;
    }

    return this.widgets[this.currentWidgetIndex];
  }

  getDuration(widget: any): number {
    let modifier = 1.0;
    if (widget.durationMultiplier) {
      modifier = widget.durationMultiplier;
    }
    return this.defaultDuration * modifier;
  }

  getWidgetRoute(): string {
    let current = this.widgets[this.currentWidgetIndex];
    if (current.children.length == 0) return '/' + current.name;
    return '/' + current.name + '/' + current.children[current.activeChild];
  }

  getWidgetObservable() {
    this.activeWidgetRoute = new Subject();
    this.activeWidgetRoute.next(this.getWidgetRoute());
    return this.activeWidgetRoute;
  }

  isAutoplayEnabled(): boolean {
    return this.autoplay;
  }

  enableAutoplay(): void {
    let s = this;
    s.autoplay = true;
    s.interval = setInterval(() => {
      s.getDestinationWidget();
      s.activeWidgetRoute.next(s.getWidgetRoute());
    }, s.getDuration(s.widgets[s.currentWidgetIndex]));
  }

  disableAutoplay() {
    this.autoplay = false;
    clearInterval(this.interval);
  }

  private widgets: any[] = [
    { id: 0, name: "comics", children: [], durationMultiplier: 1 },
    { id: 1, name: "transit", children: [], durationMultiplier: 1 },
    { id: 2, name: "finance", children: [], durationMultiplier: 1 },
    { id: 3, name: "weather", children: [] },
    // TODO: Make these linked to externalized feed list
    { id: 4, name: "rss", children: ["reuters", "ctv", "ieee", "espn"] },
    { id: 5, name: "honey", children: ["Sales", "Events", "Tech", "Other"] },
    { id: 6, name: "pictures", children: []},
    { id: 7, name: "jira", children: ["LandedFlights", "FlightBoard", "Arrivals", "UpcomingFlights"]},
    { id: 8, name: "release", children: [], durationMultiplier: 2, disabled: false }
  ];
}
