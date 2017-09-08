

export class News {
  description: string;
  title: string;
  contentSnippet: string;
  publishedDate: string;
  link: string;


  constructor (description: string, title: string, contentSnippet: string, publishedDate: string, link: string){
    this.description = description;
    this.title = title;
    this.contentSnippet = contentSnippet;
    this.publishedDate = publishedDate;
    this.link = link;
  }

}
