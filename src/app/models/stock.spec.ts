import { Stock } from "./stock";

describe('Stock', () => {

  describe('constructor', () => {
  
    let stock: Stock;
    let rawStock = {
      url: 'url',
      id: '1',
      symbol: 'AAPL',
      open: 50,
      last: 100,
    }
    
    beforeEach(() => {
      stock = new Stock(rawStock.url, rawStock.id, rawStock.symbol, rawStock.open, rawStock.last)
    });
  
    it('should set id', () => {
      expect(stock.id).toEqual(stock.id);
    });
    it('should set url', () => {
      expect(stock.url).toEqual(stock.url);
    })
    it('should set symbol', () => {
      expect(stock.symbol).toEqual(stock.symbol);
    })
    it('should set open', () => {
      expect(stock.open).toEqual(stock.open);
    })
    it('should set last', () => {
      expect(stock.last).toEqual(stock.last);
    })
    it('should set change', () => {
      expect(stock.change).not.toBeNull();
    })
    it('should set lastPull', () => {
      expect(stock.lastPull).not.toBeNull();
    })
  });

  describe('.calculateChange', () => {

    let stock: Stock;

    it('should set change as 100.0', () => {
      stock = new Stock('url', '1', 'AAPL', 50, 100)
      expect(stock.change).toEqual(100.0);
    });

    it('should set change as 100.0', () => {
      stock = new Stock('url', '1', 'AAPL', 50, 25)
      expect(stock.change).toEqual(-50.0);
    });

    it('should set change as 0 when open and last are the same value', () => {
      stock = new Stock('url', '1', 'AAPL', 50, 50)
      expect(stock.change).toEqual(0);
    });

    it('should set change as 0 when last is null', () => {
      stock = new Stock('url', '1', 'AAPL', 50, null)
      expect(stock.change).toEqual(0);
    });
  
  });

});