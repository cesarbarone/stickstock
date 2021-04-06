import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StockService } from './stock.service';
import { MarketStackService } from './market-stack.service';
import { environment } from 'src/environments/environment';
import { Stock } from '../models/stock';
import { skip } from 'rxjs/operators';

describe('Stockservice', () => {
  let service: StockService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(StockService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.refresh', () => {
    const url = 'http://fake.marketstack.com&symbol=AAPL';
    const apiStockResponse = { id: '1', url: url };
    const stock = new Stock(url, '1', 'AAPL', 100, 90);
    const marketStackResponse = { "pagination": { "limit": 1, "offset": 0, "count": 1, "total": 5162 }, "data": [{ "open": 122.15, "high": 122.15, "low": 122.15, "last": null, "close": null, "volume": null, "date": "2021-04-02T00:00:00+0000", "symbol": "AAPL", "exchange": "IEXG" }] }
    const marketStackResponse2 = { "pagination": { "limit": 1, "offset": 0, "count": 1, "total": 5162 }, "data": [{ "open": 1, "high": 122.15, "low": 122.15, "last": 1, "close": null, "volume": null, "date": "2021-04-02T00:00:00+0000", "symbol": "AAPL", "exchange": "IEXG" }] }

    beforeEach(() => {
      service.add(url).subscribe();
      const apiReq = httpTestingController.expectOne(`${environment.apiUrl}/${StockService.ENDPOINT}`);
      const marketStackReq = httpTestingController.expectOne(url);
      marketStackReq.flush(marketStackResponse);
      apiReq.flush(apiStockResponse);
    });

  
    it('should get from marketstack', () => {
      service.refresh(stock).subscribe();
      const marketStack = httpTestingController.expectOne(url);
      expect(marketStack.request.method).toEqual('GET')
      marketStack.flush(marketStackResponse);
    });

    it('should emit new stocks with refreshed stock', done => {
      service.stocks$
        .pipe(skip(1))
        .subscribe((stocks) => {
          expect(stocks[0].open).toEqual(1);
          expect(stocks[0].last).toEqual(1);
          done();
        });
      service.refresh(stock).subscribe();
      const marketStack = httpTestingController.expectOne(url);
      marketStack.flush(marketStackResponse2);
    });

    afterEach(() => {
      httpTestingController.verify();
    });
  
  });

  describe('.add', () => {
    const url = 'http://localhost/stocks?symbol=MCSF'
    const apiStockResponse = { id: '1', url: url}
    const marketStackResponse = { "pagination": { "limit": 1, "offset": 0, "count": 1, "total": 5162 }, "data": [{ "open": 122.15, "high": 122.15, "low": 122.15, "last": null, "close": null, "volume": null, "date": "2021-04-02T00:00:00+0000", "symbol": "AAPL", "exchange": "IEXG" }] }
    
    beforeEach(() => {

    });

    it('should post to api', () => {
      service.add(url).subscribe();
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${StockService.ENDPOINT}`);
      httpTestingController.expectOne(url);
      expect(req.request.body).toEqual({url: url});
      req.flush(apiStockResponse);
    });

    it('should get from MarketStack', () => {
      service.add(url).subscribe();
      httpTestingController.expectOne(`${environment.apiUrl}/${StockService.ENDPOINT}`);
      const req = httpTestingController.expectOne(url);
      expect(req.request.url).toEqual(url);
      req.flush(marketStackResponse);
    });

    it('should emmit stocks array with the new stock', done => {
      service.stocks$
        .subscribe((stocks) => {
          expect(stocks.length).toEqual(1);
          expect(stocks[0].id).toEqual(apiStockResponse.id)
          done()
        });
      service.add(url).subscribe();
      const apiReq = httpTestingController.expectOne(`${environment.apiUrl}/${StockService.ENDPOINT}`);
      const marketStackReq = httpTestingController.expectOne(url);
      marketStackReq.flush(marketStackResponse);
      apiReq.flush(apiStockResponse);
    });
      
    afterEach(() => {
      httpTestingController.verify();
    });

  });

  describe('.list', () => {

    const apiResponse = [{ id: '1', url: 'http://localhost/stocks?symbol=MCSF'}];

    it('should call api', done => {
      service.list().subscribe(() => done());
      const apiReq = httpTestingController.expectOne(`${environment.apiUrl}/${StockService.ENDPOINT}`);
      apiReq.flush(apiResponse);
      expect(apiReq.request.method).toEqual('GET')
    });    
  });

  describe('.delete', () => {

    const url = 'http://localhost/stocks?symbol=MCSF'
    const apiStockResponse = { id: '1', url: url }
    const marketStackResponse = { "pagination": { "limit": 1, "offset": 0, "count": 1, "total": 5162 }, "data": [{ "open": 122.15, "high": 122.15, "low": 122.15, "last": null, "close": null, "volume": null, "date": "2021-04-02T00:00:00+0000", "symbol": "AAPL", "exchange": "IEXG" }] }

    beforeEach(() => {
      service.add(url).subscribe();
      httpTestingController.expectOne(`${environment.apiUrl}/${StockService.ENDPOINT}`);
      const req = httpTestingController.expectOne(url);
      req.flush(marketStackResponse);
    });

    it('should call DELETE on api', () => {
      service.delete(apiStockResponse as Stock).subscribe()
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${StockService.ENDPOINT}/${apiStockResponse.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(marketStackResponse);
    });

    it('should emit a new stocks without the removed element', done => {
      service.stocks$
        .subscribe((stocks) => {
          expect(stocks.length).toBe(0);
          done();
        })
      service.delete(apiStockResponse as Stock).subscribe();
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${StockService.ENDPOINT}/${apiStockResponse.id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(marketStackResponse);
    });
  })

  describe('.bootStore', () => {
    const url = 'http://localhost.marketstack/stocks?symbol=MCSF';
    const apiResponse = [{ id: '1', url: url }];
    const marketStackResponse = { "pagination": { "limit": 1, "offset": 0, "count": 1, "total": 5162 }, "data": [{ "open": 122.15, "high": 122.15, "low": 122.15, "last": null, "close": null, "volume": null, "date": "2021-04-02T00:00:00+0000", "symbol": "AAPL", "exchange": "IEXG" }] };

    it('should call list', () => {
      service.bootStore();
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${StockService.ENDPOINT}`);
      expect(req.request.method).toEqual('GET');
      req.flush(apiResponse);
    });

    it('should marketStack', () => {
      service.bootStore();
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${StockService.ENDPOINT}`);
      req.flush(apiResponse);
      const marketStockReq = httpTestingController.expectOne(url);
      expect(marketStockReq.request.url).toEqual(url);
      marketStockReq.flush(marketStackResponse)
    });
    
    it('should emit stocks', () => {
      service.stocks$
        .subscribe((stocks) => {
          expect(stocks.length).toEqual(1)
        })
      service.bootStore();
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${StockService.ENDPOINT}`);
      req.flush(apiResponse);
      const marketStockReq = httpTestingController.expectOne(url);
      marketStockReq.flush(marketStackResponse)
    });

  });

});
