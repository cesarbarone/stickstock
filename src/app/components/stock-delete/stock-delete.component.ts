import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-delete',
  templateUrl: './stock-delete.component.html',
  styleUrls: ['./stock-delete.component.scss'],
})
export class StockDeleteComponent implements OnInit {

  @Input() stock: Stock;

  constructor(private stockService: StockService) { }

  ngOnInit() {}

  delete() {
    this.stockService.delete(this.stock).subscribe();
  }
}
