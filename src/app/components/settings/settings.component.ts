import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  public settingsForm = new FormGroup({
    percentageThreshold: new FormControl(3, Validators.required),
    highInterval: new FormControl(2, Validators.required),
    lowInterval: new FormControl(15, Validators.required),
  })

  constructor() { }

  ngOnInit() {
    // this.buildForm();
  }

  buildForm() {

  }

}
