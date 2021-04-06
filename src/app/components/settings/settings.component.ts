import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Settings } from 'src/app/models/settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {

  public settingsForm = new FormGroup({
    percentageThreshold: new FormControl(null, Validators.required),
    highInterval: new FormControl(null, Validators.required),
    lowInterval: new FormControl(null, Validators.required),
  });

  private settingsSub: Subscription;

  constructor(private settingsService: SettingsService, private menuController: MenuController) { }

  ngOnInit() {
    this.settingsService.settings$
      .subscribe((settings) => {
        this.settingsForm.get('percentageThreshold').setValue(settings.percentageThreshold);
        this.settingsForm.get('highInterval').setValue(settings.highInterval);
        this.settingsForm.get('lowInterval').setValue(settings.lowInterval);
      })
    // could be moved to module
    this.settingsService.bootStore();
  }

  apply() {
    const newSettings:Settings = {...this.settingsForm.value}
    const updateSubscription = this.settingsService.update(newSettings)
      .subscribe(() => {
        this.menuController.close();
        updateSubscription.unsubscribe();
      })
    
  }

  ngOnDestroy() {
    this.settingsSub.unsubscribe();
  }

  buildForm() {

  }

}
