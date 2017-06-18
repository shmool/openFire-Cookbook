import { Component, OnInit } from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../common/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user = {
    displayName: '',
    email: '',
    password: '',
    repeatPassword: ''
  };
  signUp = false;
  signInError;

  constructor(
    iconRegistry: MdIconRegistry,
    sanitizer: DomSanitizer,
    private userService: UserService) {
    iconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/auth/google.svg'));
  }

  ngOnInit() {
  }

  signInWithGoogle() {
    this.signInError = null;
    return this.userService.signInWithGoogle();
  }

  signInWithPassword() {
    this.signInError = null;
    return (this.signUp ?
            this.userService.signUp(this.user) :
            this.userService.signInWithPassword(this.user));
  }
}
