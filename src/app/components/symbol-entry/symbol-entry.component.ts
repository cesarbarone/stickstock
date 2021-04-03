import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SymbolService } from 'src/app/services/symbol.service';

@Component({
  selector: 'app-symbol-entry',
  templateUrl: './symbol-entry.component.html',
  styleUrls: ['./symbol-entry.component.scss'],
})
export class SymbolEntryComponent implements OnInit {

  @Input() symbolUrl: string;
  symbol$: Observable<Symbol>;

  constructor(private symbolService: SymbolService) { }

  ngOnInit() {
    const lastPull = Date.now()
    this.symbol$ = of({ symbol: 'PETR4', lastPull: lastPull, open: 122.93, last: 121.91, change: 5.2 } as unknown as Symbol)
    // this.symbol$ = this.symbolService.get(this.symbolUrl);
  }

}
