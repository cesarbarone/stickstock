import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Settings } from '../models/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  public static readonly ENDPOINT = 'settings';
  private _settings: Settings = new Settings();
  public readonly settings$: ReplaySubject<Settings> = new ReplaySubject();

  constructor(private http: HttpClient) { }
  
  bootStore(): void {
    let subscription = this.http.get<Settings>(`${environment.apiUrl}/${SettingsService.ENDPOINT}`)
      .subscribe((settingsResponse) => {
        this._settings.update(settingsResponse);
        this.emitSettings();
        subscription.unsubscribe();
      })
  }

  update(newSettings: Settings): Observable<void> {
    return this.http.put<Settings>(`${environment.apiUrl}/${SettingsService.ENDPOINT}`, newSettings)
      .pipe(
        map(() => {
          this._settings.update(newSettings);
          this.emitSettings();
        })
      )
  }

  polling() {
    
  }

  private emitSettings() {
    this.settings$.next(this._settings)
  }
}
