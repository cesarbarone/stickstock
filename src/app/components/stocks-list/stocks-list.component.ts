import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StockService } from 'src/app/services/stock.service';
import { Stock } from '../../models/stock'

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss'],
})
export class StocksListComponent implements OnInit {

  public stocks$: Observable<Stock[]>;

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stocks$ = this.stockService.stocks$;
    // It could be moved to app.module. This is the 'main' component, so I kept it here
    this.stockService.bootStore();
  }
}