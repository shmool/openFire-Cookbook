import { Component, OnInit } from '@angular/core';
import { UserService, authStatus, User } from '../../../common/user/user.service';

@Component({
  selector: 'app-user-status',
  template: `
    <div [ngSwitch]="authStatus"
         class="user-info">

      <md-spinner *ngSwitchCase="authStatuses.pending"
                  color="accent"
                  class="header-spinner"></md-spinner>

      <a *ngSwitchCase="authStatuses.anonymous" md-button [routerLink]="'sign-in'">
        <md-icon>account_circle</md-icon>
        <span>Sign in</span>
      </a>

      <div *ngSwitchCase="authStatuses.authenticated"
           class="signed-in-user-container"
           [mdMenuTriggerFor]="menuPerson">

        <button md-button class="usernamelink">
          <app-avatar [photoUrl]="avatarPhoto"
                      [color]="avatarColor"></app-avatar>
          <div class="username">{{ displayName }}</div>
        </button>

        <md-menu #menuPerson="mdMenu" xPosition="before">
          <button md-menu-item (click)="signOut($event)">
            <md-icon>exit_to_app</md-icon>
            <span>Sign Out</span>
          </button>
        </md-menu>

      </div>
    </div>
  `,
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements OnInit {
  user: User;
  authStatuses = authStatus;

  constructor(private userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit() {
  }
  get authStatus() {
    return this.userService.user.authStatus;
  }


  get displayName() {
    return this.userService.user.displayName;
  }

  get avatarColor() {
    return this.userService.user.avatarColor;
  }

  get avatarPhoto() {
    return this.userService.user.photoURL;
  }

  signOut() {
    this.userService.signOut();
  }
}
