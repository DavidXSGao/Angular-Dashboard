import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JiraService } from '../../service/jira/jira.service';
import { JiraItem } from '../../service/jira/jiraitem'

@Component({
  selector: 'jira_list',
  styleUrls: ['./jira.component.css'],
  templateUrl: './jira.component.html',
  providers: [JiraService]
})

/*
 * Component for displaying a list of JIRA issues.
 */
export class JiraComponent implements OnInit {
  private static LIST_CONFIG = {
    'FlightBoard': {
      'caption': 'Flight Board (In Development)',
      'footerImage': require('./imgs/paperPlane.png')
    },
    'UpcomingFlights': {
      'caption': 'Upcoming Flights (Queued for Development)',
      'footerImage': require('./imgs/passportControl.png')
    },
    'Arrivals': {
      'caption': 'Arrivals (Epics with items Pending Release)',
      'footerImage': require('./imgs/paperPlane.png')
    },
    'LandedFlights': {
      'caption': 'Landed Flights (Recently deployed to production)',
      'footerImage': require('./imgs/arrival.png')
    }
  };

  // Map JIRA statuses to our 'Flight' model
  private static STATUSES = {
    'Done': {
      'statusClass': 'arrived',
      'label': 'Arrived'
    },
    'To Do': {
      'statusClass': 'ontime',
      'label': 'Scheduled'
    },
    'In Progress': {
      'statusClass': 'enroute',
      'label': 'Enroute'
    }
  }

  private sListCaption : string;
  private issues : JiraItem[];
  private footerImage : string;

  private itemLimit: number = 6;
  private displayedItemLow: number = 0;
  private displayedItemHigh: number = 0;
  private componentDuration: number = 45000;
  private pageInterval = null;
  private subscription = null;

  constructor(private jiraService: JiraService, private route: ActivatedRoute) { }

  ngOnInit() {
    let comp = this;


    this.route.params.subscribe(params => {
      let sListName = params['listName'];
      let listConfig = JiraComponent.LIST_CONFIG[sListName];

      this.subscription = this.jiraService.getRecords(sListName).subscribe(function (res) {
        comp.issues = res;
        comp.initializePaginator();
      });

      if (listConfig) {
        this.sListCaption = listConfig['caption'];
        this.footerImage = listConfig['footerImage'];
      }
    })
  }

  ngOnDestroy() {
    clearInterval(this.pageInterval);
    this.subscription.unsubscribe();
  }

  // Switch between pages of issues if there are more than the page limit
  initializePaginator(): void {
    clearInterval(this.pageInterval);
    this.displayedItemLow = 0;
    let numPages = Math.ceil(this.issues.length / this.itemLimit);
    if (numPages === 1) {
      this.displayedItemHigh = this.issues.length;
      return;
    }

    // Initialize the first page and set a timeout to move on
    this.displayedItemHigh = 6;

    let pageTimeout = this.componentDuration / numPages;
    let comp = this;
    this.pageInterval = setInterval(function() {
      comp.incrementIssuePage();
    }, pageTimeout);
  }

  incrementIssuePage() {
    this.displayedItemLow += 6;
    this.displayedItemHigh = Math.min(this.displayedItemHigh + 6, this.issues.length);
  }

  // For a JIRA issue, return the decoration class based on its status
  getStatus(issue: any): string {
    let status = JiraComponent.STATUSES[issue.status];
    return status;
  }

}
