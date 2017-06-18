import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  template: `
    <div *ngIf="photoUrl"
         class="avatar"
         [ngStyle]="{'background-image': getAvatarImage()}"></div>

    <md-icon *ngIf="!photoUrl"
             class="avatar"
             [ngStyle]="{color: color}">face</md-icon>
  `,
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() photoUrl;
  @Input() color;

  constructor() { }

  ngOnInit() {
  }

  getAvatarImage() {
    return `url(${this.photoUrl})`;
  }

}
