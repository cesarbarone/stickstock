export class Stock {
  private _id: string;
  private _url: string;
  private _symbol: string;
  private _lastPull: number;
  
  private _change?: number;
  public open: number;
  public last: number;
  
  public intervalType: string = 'low';

  constructor(url: string, id: string, symbol: string, open: number, last: number) {
    this._id = id;
    this._url = url;
    this._lastPull = Date.now();
    this.open = open;
    this.last = last || open;
    this._symbol = symbol;
    this.calculateChange();
  }

  set url(url: string) {
    this._url = url;
  }

  set lastPull(number) {
    this._lastPull = number;
  }

  get id() {
    return this._id;
  }

  get symbol() {
    return this._symbol;
  }

  get lastPull() {
    return this._lastPull;
  }

  get change() {
    return this._change;
  }

  get url() {
    return this._url;
  }

  calculateChange() {
    this._change = ((this.last/this.open) - 1)*100
  }
}