import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { JiraItem } from './jiraitem';

/*
 * Injectable service that can be used to retrieve a list of JIRA items for display.
 *
 * Lists will need to be pre-defined via JQL.  Service uses a read-only user to access JIRA.
 */
@Injectable()
export class JiraService {
  private static JIRA_URL = 'http://jira.visualfrenzy.com/rest/api/2/search?jql=';
  private static LIST_CFG = {
    'UpcomingFlights': {
      'jql': 'issuetype%20%3D%20Epic%20AND%20"Epic%20Type"%20%3D%20Roadmap%20AND%20"Epic%20Status"%20%3D%20"To%20Do"%20ORDER%20BY%20"Scrum%20Team"%2C%20"Epic%20Status"%20DESC&fields=summary,customfield_11440,customfield_11443,components'
    },
    'FlightBoard': {
      'jql': 'issuetype%20%3D%20Epic%20AND%20"Epic%20Type"%20%3D%20Roadmap%20AND%20"Epic%20Status"%20%3D%20"In%20Progress"%20ORDER%20BY%20"Scrum%20Team"%2C%20"Epic%20Status"%20DESC&fields=summary,customfield_11440,customfield_11443,components'
    },
    'Arrivals': {
      'jql': 'issueFunction%20in%20linkedIssuesOf(%22status%3D%27Pending%20Deployment%27%22)%20AND%20issueType%20%3D%20%22Epic%22%20ORDER%20BY%20%22Scrum%20Team%22%2C%20%22Epic%20Status%22%20DESC&fields=summary,customfield_11440,customfield_11443,components'
    },
    'LandedFlights': {
      'jql': 'issuetype%20%3D%20Epic%20AND%20"Epic%20Type"%20%3D%20Roadmap%20AND%20"Epic%20Status"%20%3D%20"Done"%20AND%20"Epic%20Completion%20Date"%20>%20startOfYear()%20ORDER%20BY%20"Scrum%20Team"%20%2C%20"Updated"%20ASC&fields=summary,customfield_11440,customfield_11443,components'
    }
  };

  private static AUTH_TOKEN = 'dHYudXNlcjp5b2kjNzhVeSZsYg==';

  constructor (private http: Http) {}

  /* Retrieve pre-defined list of JIRA items via JQL and the read-only user */
  getRecords(sListName : string) {
    let sJQL = (JiraService.LIST_CFG[sListName]) ? JiraService.LIST_CFG[sListName]['jql'] : null;
    let entries : JiraItem[] = [];

    if (sJQL != null) {
      let headers = new Headers();

      headers.append('Authorization', 'Basic ' + JiraService.AUTH_TOKEN);

      return this.http.get(JiraService.JIRA_URL + sJQL, {headers: headers})
        .map(
          function (response) {
              let results = response.json();
              let issues = results.issues;

              for (let issue of issues) {
                let fields = issue.fields;

                let status = fields.customfield_11443.value;
                if (sListName === 'Arrivals') {
                  status = 'In Progress';
                }

                let componentName = "";
                if (fields.components.length === 1) {
                  componentName = fields.components[0].name;
                } else if (fields.components.length > 1) {
                  componentName = "Several";
                }

                entries.push(new JiraItem(issue.key,
                                          fields.summary,
                                          fields.customfield_11440 ? fields.customfield_11440.value : "",
                                          status,
                                          componentName));
              }
              return entries;
          },
          function (error) {
            console.error ('Jira Retrieval Error: ' + error);
          }
        );
    }
  }
}
