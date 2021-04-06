import { Component, OnInit } from '@angular/core';
import { PollingService } from 'src/app/services/polling.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.scss'],
})
export class StockAddComponent implements OnInit {

  public stockUrl: string = 'http://localhost:4567/marketstack/AAPL';

  constructor(private stockService: StockService) { }

  ngOnInit() {}

  addStock(event) {
    this.stockService.add(this.stockUrl).subscribe();
  }
}
