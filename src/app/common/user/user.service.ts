import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum authStates {
  'pending',
  'authenticated',
  'anonymous'
}

export interface User {
  displayName?: string,
  uid?: string,
  photoURL?: string,
  avatarColor?: string,
  email?: string,
}

@Injectable()
export class UserService {
  user: User;
  authState: authStates;
  userAuthData$: Subject<any> = new Subject();
  authError: any = null;

  constructor() {
    this.startAuth();
    setTimeout(() => {
      this.signOut();
    }, 2000);
  }

  generateUser(displayName, avatarColor) {
    this.startAuth();
    let userPromise = new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const user = {
          displayName,
          avatarColor,
        };
        this.authState = authStates.authenticated;
        resolve(user);
      }, 2000);
    });
    return userPromise.then(generatedUser => {
      this.user = generatedUser;
      this.userAuthData$.next(true);
      return this.user;
    });
  }

  signOut() {
    this.user = {
      displayName: '',
      avatarColor: ''
    };
    this.authState = authStates.anonymous;
    this.userAuthData$.next(null);
  }

  signInWithGoogle() {
    return this.generateUser('Google User', 'red')
  }

  signInWithPassword(user): Promise<User> {
    return this.generateUser('JS-Poland', 'blue')
  };

  signUp(user) {
    return this.generateUser(user.displayName, 'green');
  }

  startAuth() {
    this.authError = null;
    this.authState = authStates.pending;
  }
}
