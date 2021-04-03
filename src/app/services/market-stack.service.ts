import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MarketStackService {

  constructor(private http: HttpClient) { }

  get(url: string): Observable<MarketStackSymbol> {
    return this.http.get<MarketStackResponse>(url)
      .pipe(
        map((marketStackResponse: MarketStackResponse) => marketStackResponse.data[0] )
      )
  }
}

export interface MarketStackResponse {
  data: MarketStackSymbol[];
}

export interface MarketStackSymbol {
  url: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  last: number;
  close: number;
  volume: number;
}

// { "pagination": { "limit": 2, "offset": 0, "count": 2, "total": 5162 }, "data": [{ "open": 122.15, "high": 122.15, "low": 122.15, "last": null, "close": null, "volume": null, "date": "2021-04-02T00:00:00+0000", "symbol": "AAPL", "exchange": "IEXG" }, { "open": 122.15, "high": 122.15, "low": 122.15, "last": null, "close": null, "volume": null, "date": "2021-04-01T23:00:00+0000", "symbol": "AAPL", "exchange": "IEXG" }] }