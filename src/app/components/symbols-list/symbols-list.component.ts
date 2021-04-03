import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-symbols-list',
  templateUrl: './symbols-list.component.html',
  styleUrls: ['./symbols-list.component.scss'],
})
export class SymbolsListComponent implements OnInit {

  symbolsUrls: string[];

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.data
      .subscribe((value: { symbolsUrls: string[] }) => {
        this.symbolsUrls = value.symbolsUrls;
      })
    }
}
