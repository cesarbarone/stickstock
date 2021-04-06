import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-add',
  templateUrl: './stock-add.component.html',
  styleUrls: ['./stock-add.component.scss'],
})
export class StockAddComponent implements OnInit {

  public stockUrl:string;

  constructor(private stockService: StockService) { }

  ngOnInit() {}

  addStock(event) {
    this.stockService.add(this.stockUrl).subscribe();
  }
}
