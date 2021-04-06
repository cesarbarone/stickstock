import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppSettings } from '../models/app-settings';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {
  
  public static readonly ENDPOINT = 'settings';
  private _settings: AppSettings = new AppSettings();
  public readonly settings$: ReplaySubject<AppSettings> = new ReplaySubject();

  constructor(private http: HttpClient) { }
  
  bootStore(): void {
    this.http.get<AppSettings>(`${environment.apiUrl}/${AppSettingsService.ENDPOINT}`)
      .subscribe((settingsResponse) => {
        
        Object.assign(this._settings, settingsResponse);
        this.emitSettings();
      })
  }

  update(newSettings: AppSettings): Observable<void> {
    return this.http.put<AppSettings>(`${environment.apiUrl}/${AppSettingsService.ENDPOINT}`, newSettings)
      .pipe(
        map(() => {
          this.updateLocalSettings(newSettings);
          this.emitSettings();
        })
      )
  }

  private updateLocalSettings(newSettings) {
    Object.assign(this._settings, newSettings);
  }

  private emitSettings() {
    this.settings$.next(this._settings)
  }
}
