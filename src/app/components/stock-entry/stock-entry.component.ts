import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-stock-entry',
  templateUrl: './stock-entry.component.html',
  styleUrls: ['./stock-entry.component.scss'],
})
export class StockEntryComponent implements OnInit {

  @Input() stock: Stock;

  constructor(private Stockservice: StockService) { }

  ngOnInit() {
    
  }

}
