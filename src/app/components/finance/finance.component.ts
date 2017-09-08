import { Component, OnInit } from '@angular/core';

import { FinanceService } from '../../service/finance/finance.service';

@Component({
  selector: 'finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
  providers: [ FinanceService ]
})
export class FinanceComponent implements OnInit {
  constructor(private financeService: FinanceService) {};

  indicators: any[];

  ngOnInit(): void {
    this.indicators = this.financeService.loadFinancialData();
  }

  // Given an indicator return the change styling class
  getChangeClass(indicator: any): string {
    if (indicator.change < 0) return 'change-loss';
    if (indicator.change > 0) return 'change-gain';
    return 'change-none';
  }

  getChangeIcon(indicator: any): string {
    if (indicator.change < 0) return 'glyphicon glyphicon-chevron-down';
    if (indicator.change > 0) return 'glyphicon glyphicon-chevron-up';
    return '';
  }
}
