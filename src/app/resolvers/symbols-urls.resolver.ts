import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SymbolService } from '../services/symbol.service';

@Injectable({
  providedIn: 'root'
})
export class SymbolsUrlsResolver implements Resolve<string[]> {

  constructor(private http: HttpClient, private symbolService: SymbolService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string[]> {
    return this.symbolService.list()
  }
}