import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AppSettings } from '../models/app-settings';

import { AppSettingsService } from './app-settings.service';

describe('AppSettingsService', () => {
  let service: AppSettingsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AppSettingsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.update', () => {

    const settingsUrl = `${environment.apiUrl}/${AppSettingsService.ENDPOINT}`;
    const newSettings: AppSettings = { percentageThreshold: 1, highInterval: 1, lowInterval: 1 };
  
    it('should PUT to api', () => {
      service.update(newSettings).subscribe();
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${AppSettingsService.ENDPOINT}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(newSettings);
      req.flush({});
    });
  
  });

  describe('.bootStore', () => {

    const settingsUrl = `${environment.apiUrl}/${AppSettingsService.ENDPOINT}`;
    const apiResponse = { percentageThreshold: 3, highInterval: 2, lowInterval: 15 };
    
    it('should request settings from api', () => {
      service.bootStore();
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${AppSettingsService.ENDPOINT}`);
      expect(req.request.method).toEqual('GET');
      req.flush(apiResponse);
    });

    it('should emit settings', done => {
      service.settings$
        .subscribe((settings) => {
          expect(settings.percentageThreshold).toEqual(apiResponse.percentageThreshold)
          expect(settings.highInterval).toEqual(apiResponse.highInterval)
          expect(settings.lowInterval).toEqual(apiResponse.lowInterval)
          done()
        })
      service.bootStore();
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${AppSettingsService.ENDPOINT}`);
      req.flush(apiResponse);
    });
    
  
  });
});
