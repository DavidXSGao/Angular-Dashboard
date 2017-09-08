import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ReleaseService {
  // Read release status information from an external JSON somewhere
  // Ideally make an editor or UI for it but for now static file

  private HOSTNAME: string = "localhost:3003";

  constructor(private http: Http) { }

  // Refresh the release status
  updateStatus(): any {
    let url = 'http://' + this.HOSTNAME + '/release';
    return this.http.get(url)
      .map(res => res.json());
  }

  postReleasePlan(releasePlan: any) {
    let url = "http://" + this.HOSTNAME + '/release';
    return this.http.put(url, {'release': releasePlan }).map(res => res.json());
  }
}
