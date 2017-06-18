import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../common/router/routing.service';

@Component({
  selector: 'app-main',
  template: `
    <app-header></app-header>
    
    <div class="app-content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private routerService: RoutingService) {
  }

  ngOnInit() {
  }
}
