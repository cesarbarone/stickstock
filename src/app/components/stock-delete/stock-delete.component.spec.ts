import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { Stock } from 'src/app/models/stock';
import { StockService } from 'src/app/services/stock.service';

import { StockDeleteComponent } from './stock-delete.component';

describe('StockDeleteComponent', () => {
  let component: StockDeleteComponent;
  let fixture: ComponentFixture<StockDeleteComponent>;
  let stockService: StockService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDeleteComponent, ],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [StockService],
    }).compileComponents();

    fixture = TestBed.createComponent(StockDeleteComponent);
    stockService = TestBed.inject(StockService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('.delete', () => {

    let stock = {} as Stock;

    beforeEach(() => {
      component.stock = stock;
    });
    
    it('should call StockService.delete', () => {
      spyOn(stockService, 'delete').and.returnValue(of())
      component.delete();
      expect(stockService.delete).toHaveBeenCalledOnceWith(stock);
    });
  });
});
