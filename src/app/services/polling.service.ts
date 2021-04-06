import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';
import { Stock } from '../models/stock';
import { SettingsService } from './settings.service';
import { StockService } from './stock.service';

@Injectable({
  providedIn: 'root'
})
export class PollingService {

  private _highPollingQueue: Stock[] = [];
  private _lowPollingQueue: Stock[] = [];
  private _intervalIds: number[] = [];
  private _settings: Settings;
  private _stocks: Stock[] = [];

  constructor(private stockService: StockService, private settingsService: SettingsService) { 
  }

  boot() {
    this.stockService.stocks$
      .subscribe((stocks) => {
        this._stocks = stocks;
        this.run();
      });

    this.settingsService.settings$
      .subscribe((settings) => {
        this._settings = settings;
        this.run();
      });
  }

  run() {
    if(this._settings && this._stocks.length > 0) {
      this.classify(this._stocks, this._settings);
      this.polling(this._highPollingQueue, this._lowPollingQueue, this._settings)
    } else {
      this.reboot();
    }
  }

  classify(stocks: Stock[], settings: Settings) {
    this.reboot();
    //use loadash or underscore is even better
    this._lowPollingQueue = stocks.filter((stock) => {
      return stock.change <= settings.percentageThreshold;
    });
    this._highPollingQueue = stocks.filter((stock) => {
      return stock.change > settings.percentageThreshold;
    });
  }

  polling(highPollingQueue: Stock[], lowPollingQueue: Stock[], settings: Settings) {
    this.pollingQueue(highPollingQueue, settings.highInterval, 'high');
    this.pollingQueue(lowPollingQueue, settings.lowInterval, 'low');
  }

  get highPollingQueue() {
    return this._highPollingQueue;
  }
  
  get lowPollingQueue() {
    return this._lowPollingQueue;
  }

  private reboot() {
    this._intervalIds.forEach(intervalId => {
      clearInterval(intervalId);
    });
    this._intervalIds = [];
    this._highPollingQueue = [];
    this._lowPollingQueue = [];
  }

  private pollingQueue(queue: Stock[], interval, intervalType) {
    queue.forEach((stock) => {
      stock.intervalType = intervalType;
      const intervalFn = () => {
        let subscription = this.stockService.refresh(stock)
          .subscribe(() => subscription.unsubscribe())
      }
      let pollingId = window.setInterval(intervalFn, interval*1000);
      this._intervalIds.push(pollingId);
    });
  }
}
