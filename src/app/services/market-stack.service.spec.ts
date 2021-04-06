import { TestBed } from '@angular/core/testing';

import { MarketStackService } from './market-stack.service';

xdescribe('MarketStackService', () => {
  let service: MarketStackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketStackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
