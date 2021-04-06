import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Settings } from '../models/settings';
import { Stock } from '../models/stock';

import { PollingService } from './polling.service';
import { SettingsService } from './settings.service';
import { StockService } from './stock.service';

describe('PollingService', () => {
  let service: PollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        StockService,
        SettingsService,
      ]
    });
    service = TestBed.inject(PollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.classify', () => {

    const settings = { percentageThreshold: 3, highInterval: 2, lowInterval: 15 } as Settings;
    const stocks: Stock[] = [
      { id: '5', change: 5 },
      { id: '1', change: 1 }
    ] as Stock[];
  
    it('.classify', () => {
      service.classify(stocks, settings);
      expect(service.highPollingQueue.length).toEqual(1);
      expect(service.lowPollingQueue.length).toEqual(1);
    });
  
  });
});