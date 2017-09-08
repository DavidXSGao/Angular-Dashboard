import{Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import {Post} from './post';
import {Timestamp} from "rxjs";


@Injectable()
export class HoneyService {
  constructor (private http: Http) {}

  getPosts(feedName : String): Array<Post> {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer BEy2t_XiIbfKprS4_BIez70EgeLCVW');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    let postArray : Post[]=[];

    var result = this.http.get("https://api.honey.is/org/18735/posts", {
        headers: headers})
        .map(res => res.json())
        .subscribe(
          function(response) {
            let posts = response.posts;
            for(let post of posts){
              let myPost = new Post(post.title, post.author.name, post.author.id, post.like_count, post.view_count, post.created_at, post.author.avatar_url, post.comment_count);
              if(("Sales") == feedName) {
                if ("Sales" == post.groups[0].name || "Marketing" == post.groups[0].name) {
                  postArray.push(myPost);
                }
              }
              else if(("Events") == feedName){
                if("Events & News" == post.groups[0].name || "Leonardo Feeds" == post.groups[0].name) {
                  postArray.push(myPost);
                }
              }
              else if(("Tech") == feedName){
                if("IT & Operations" == post.groups[0].name || "Engineering" == post.groups[0].name) {
                  postArray.push(myPost);
                }
              }
              else {
                if("Events & News" != post.groups[0].name && "Sales" != post.groups[0].name && "Leonardo Feeds" != post.groups[0].name &&  "Marketing" != post.groups[0].name){
                  postArray.push(myPost);
                }
              }
            }

          },
          function(error) { console.log("Error happened: " + error)},
          function() {
            postArray.sort(function(a, b){
              return b.rank - a.rank;
            });
          })


    return postArray;
  }


}
