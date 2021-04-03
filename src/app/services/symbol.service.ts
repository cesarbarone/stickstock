import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MarketStackService, MarketStackSymbol } from './market-stack.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  constructor(private http: HttpClient, private marketStackService: MarketStackService) { }

  list(): Observable<string[]> {
    const urls =  [
      'http://api.marketstack.com/v1/intraday?access_key=3b82d85f4173b772bd82251c113b40bc&symbols=AAPL&limit=1',
      'http://api.marketstack.com/v1/intraday?access_key=3b82d85f4173b772bd82251c113b40bc&symbols=PETR4&limit=1',
      'http://api.marketstack.com/v1/intraday?access_key=3b82d85f4173b772bd82251c113b40bc&symbols=PETR4&limit=1',
      'http://api.marketstack.com/v1/intraday?access_key=3b82d85f4173b772bd82251c113b40bc&symbols=PETR4&limit=1',
      'http://api.marketstack.com/v1/intraday?access_key=3b82d85f4173b772bd82251c113b40bc&symbols=PETR4&limit=1',
      'http://api.marketstack.com/v1/intraday?access_key=3b82d85f4173b772bd82251c113b40bc&symbols=PETR4&limit=1',
    ]
    return of(urls)
    // // return this.http.get('http://localhost:3000')
    // return new Promise((resolve, reject) => {
    //   const urls = [
    //     'http://api.marketstack.com/v1/intraday?access_key=3b82d85f4173b772bd82251c113b40bc&symbols=AAPL&limit=1'
    //   ]
    //   resolve(urls);
    // })
  }
  
  get(url: string): Observable<Symbol> {
    return this.marketStackService.get(url)
      .pipe(
        map((marketStackSymbol: MarketStackSymbol) => marketStackSymbol as unknown as Symbol)
      )
  }
}
