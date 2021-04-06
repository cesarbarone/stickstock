import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Settings } from '../models/settings';

import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SettingsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('.update', () => {

    const settingsUrl = `${environment.apiUrl}/${SettingsService.ENDPOINT}`;
    const newSettings: Settings = { percentageThreshold: 1, highInterval: 1, lowInterval: 1 } as Settings;
  
    it('should PUT to api', () => {
      service.update(newSettings).subscribe();
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${SettingsService.ENDPOINT}`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(newSettings);
      req.flush({});
    });

    it('should emit new settings', done => {
      service.settings$.subscribe((newSettings) => {
        expect(newSettings.percentageThreshold).toEqual(1);
        expect(newSettings.highInterval).toEqual(1);
        expect(newSettings.lowInterval).toEqual(1);
        done();
      });
      service.update(newSettings).subscribe();
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${SettingsService.ENDPOINT}`);
      req.flush({});
    });
  
  });

  describe('.bootStore', () => {

    const settingsUrl = `${environment.apiUrl}/${SettingsService.ENDPOINT}`;
    const apiResponse = { percentageThreshold: 3, highInterval: 2, lowInterval: 15 };
    
    it('should request settings from api', () => {
      service.bootStore();
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${SettingsService.ENDPOINT}`);
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
      const req = httpTestingController.expectOne(`${environment.apiUrl}/${SettingsService.ENDPOINT}`);
      req.flush(apiResponse);
    });
    
  
  });
});
