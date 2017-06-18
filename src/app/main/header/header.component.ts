import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="app-toolbar-container">
  <md-toolbar class="app-toolbar mat-elevation-z6" color="primary">

    <button md-icon-button routerLink="/">
      <md-icon>restaurant</md-icon>
    </button>

    <span class="app-toolbar-title" routerLink="/">{{ title }}</span>
    <span class="app-toolbar-filler"></span>

    <app-user-status></app-user-status>

  </md-toolbar>
</div>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'OpenFire Cookbook';

  constructor() { }

  ngOnInit() {
  }

}
