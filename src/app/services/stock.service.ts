import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, from, Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { MarketStackService, MarketStackStock } from './market-stack.service';
import { concatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { Stock } from '../models/stock';
import { environment } from 'src/environments/environment';
import { splitClasses } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  public static readonly ENDPOINT = 'stocks';
  private _stocks: Stock[] = []
  public readonly stocks$:ReplaySubject<Stock[]> = new ReplaySubject();

  constructor(private http: HttpClient, private marketStackService: MarketStackService) {}

  add(url: string): Observable<Stock> {
    const apiPost = this.http.post(`${environment.apiUrl}/${StockService.ENDPOINT}`, { url: url });
    const marketStackGet = this.marketStackService.get(url);
    return forkJoin( [apiPost, marketStackGet])
      .pipe(
        map((result) => {
          const apiStock = result[0] as Stock;
          const marketStackStock = result[1];
          const stock = this.parseMarketStackToStock(marketStackStock, apiStock)
          this._stocks.unshift(stock);
          this.emitStocks();
          return stock;
        })
      )
  }
  
  delete(stock: Stock): Observable<void> {
    return this.http.delete(`${environment.apiUrl}/${StockService.ENDPOINT}/${stock.id}`)
      .pipe(
        map(() => {
          const idx = this._stocks.findIndex((arrStock) => arrStock.id == stock.id );
          this._stocks.splice(idx, 1);
          this.emitStocks();
        })
      );
  }
  
  list(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${environment.apiUrl}/${StockService.ENDPOINT}`);
  }

  del(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${StockService.ENDPOINT}/1223`)
  }

  bootStore(): void {
    let apiStocks;
    const list$ = this.list()
    const subscription = list$.pipe(
        switchMap((apiStocksResponse: Stock[]) => {
          apiStocks = apiStocksResponse
          const gets = apiStocks.map(jsonStock => this.marketStackService.get(jsonStock.url));
          return forkJoin(gets)
        })
      ).subscribe((marketStackStocks: MarketStackStock[]) => {
        const parsed = marketStackStocks.map((marketStackStock, index) => {
          return this.parseMarketStackToStock(marketStackStock, apiStocks[index])
        });
        this._stocks = this._stocks.concat(parsed);
        this.emitStocks();
        subscription.unsubscribe();
      })
  }

  private parseMarketStackToStock(marketStackToStock: MarketStackStock, jsonStock: Stock): Stock {
    return new Stock(jsonStock.url, jsonStock.id, marketStackToStock.symbol, marketStackToStock.open, marketStackToStock.last);
  }

  private emitStocks() {
    this.stocks$.next(this._stocks);
  }
}
