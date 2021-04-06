import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Stock } from '../models/stock';
import { StockService } from '../services/stock.service';

@Injectable({
  providedIn: 'root'
})
export class StocksUrlsResolver implements Resolve<Stock> {

  constructor(private http: HttpClient, private stockService: StockService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ReplaySubject<Stock> {
    return this.stockService.stocks$;
  }
}