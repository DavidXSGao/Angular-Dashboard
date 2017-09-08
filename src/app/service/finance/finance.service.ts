import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

/* This service loads financial data for various indicators using Yahoo Finance */
@Injectable()
export class FinanceService {
  constructor(private http: Http) {
  };

  indicators: any[] = [];

  symbolsList = "XBB.TO,^GSPTSE,^GSPC,^IXIC,CADUSD=X,CL=F";

  // Cryptic but f=l1oc1p2 defines values we want
  // l1: last trade $, o: open, c1: change, p2: change (in %)
  private yahooFinanceQueryUrl = "http://download.finance.yahoo.com/d/quotes.csv?s={symbols}&f=snl1oc1p2";

  data: string = "";

  // Load CSV and parse it to correspond to our desired indicators here
  loadFinancialData(): any[] {
    //this.chooseStocks();
    // Collapse the list of tickers we want to load data for
    let url = this.yahooFinanceQueryUrl.replace("{symbols}", this.symbolsList);

    this.http.get(url).subscribe(data => this.parseData(data.text()));
    return this.indicators;
  }

  parseData(csvData: string): void {
    // Split up the CSV into lines
    let lines = csvData.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i]) this.indicators.push(this.convertToIndicator(lines[i]));
    }
  }

  convertToIndicator(line: string): any {
    let values = line.split(',');
    return {
      symbol: values[0],
      name: values[1].replace(/\"/g, ""),
      lastPrice: values[2],
      openPrice: values[3],
      change: values[4].replace(/\+/g, ""),
      changePercent: values[5].replace(/\"/g, "")
    }
  }

  //creates an array of all the stocks in the DJIA
  parseText(): string[] {
    let allText;

    function readTextFile(file) {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            allText = rawFile.responseText;
          }
        }
      }
      rawFile.send(null);
    }

    readTextFile("app/service/finance/allStocks.txt");
    //ftp://ftp.nasdaqtrader.com/symboldirectory/nasdaqlisted.txt

    let stockTickers: string[] = allText.split("\n");
    return stockTickers;
  }

  chooseStocks(): any {
    let allStocks = this.parseText();
    for (var index = 0; index < allStocks.length; index++) {
      let stock = allStocks[index]
    }

  }
}
