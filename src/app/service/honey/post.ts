

export class Post {

  title: string;
  author: string;
  authorID: number;
  likes : number;
  views : number;
  date : string;
  author_image: string;
  comment_count: number
  rank : number;

  constructor (title: string, author: string, authorID: number, likes: number, views: number, date : number, author_image_url : string, comment_count : number){
    this.title = title;
    this.author = author;
    this.authorID = authorID;
    this.likes = likes;
    this.views = views;
    this.date = this.makeReadableDate(date);
    this.author_image = "https://cdn.honey.is" + author_image_url + "?size=100";
    this.comment_count = comment_count;

    var created = (((new Date(date).getTime() - new Date().getTime() )/ 1000)/450) % 10000;
    this.rank = created + Math.log(1 + views + 3*likes + 2*comment_count) ;//some formula for sorting
  }

  makeReadableDate(date) : string {
    let readableDate = "";
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let day = days[new Date(date).getDay()];
    let stringDate = date.toString();
    let year = stringDate.substring(0,4);
    let month = months[parseInt(stringDate.substring(5,7))-1];
    let numberDay = stringDate.substring(8,10);
    let hour = stringDate.substring(11, 13);
    let mins = stringDate.substring(14, 16);
    let AMPM = "AM";

    if(hour > 12){
      hour = hour - 12;
      AMPM = "PM";
    }
    else{
      hour = hour.replace(/^0+/, '');
    }
    readableDate = day + ", " + month + " " + numberDay + ", " + year + " at " + hour + ":" + mins + " " + AMPM;
    return readableDate;
}


}
