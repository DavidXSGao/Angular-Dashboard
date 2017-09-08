/*
 * Class representing a single JIRA item
 */
export class JiraItem {
  key: string;
  summary: string;
  scrumTeam: string;
  status: string;
  component: string;

  constructor (key: string, summary: string, scrum_team: string, status: string, component: string){
    this.key = key;
    this.summary = summary;
    this.scrumTeam = scrum_team;
    this.status = status;
    this.component = component;
  }

}
