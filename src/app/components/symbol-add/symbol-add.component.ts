import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-symbol-add',
  templateUrl: './symbol-add.component.html',
  styleUrls: ['./symbol-add.component.scss'],
})
export class SymbolAddComponent implements OnInit {

  public symbol = {url: ''};

  constructor() { }

  ngOnInit() {}

}
