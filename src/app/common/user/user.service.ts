import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum authStatus {
  'pending',
  'authenticated',
  'anonymous'
}

export interface User {
  displayName?: string,
  uid?: string,
  photoURL?: string,
  avatarColor?: string,
  authStatus: authStatus
}

@Injectable()
export class UserService {
  user: User;
  userAuthState$: Subject<any> = new Subject();

  constructor() {
    this.startPending();
    setTimeout(() => {
      this.signOut();
    }, 2000);
  }

  startPending() {
    this.user = {
      authStatus: authStatus.pending
    };
  }

  generateUser(displayName, avatarColor) {
    this.startPending();
    let userPromise = new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        const user = {
          displayName,
          avatarColor,
          authStatus: authStatus.authenticated
        };
        resolve(user);
      }, 2000);
    });
    return userPromise.then(generatedUser => {
      this.user = generatedUser;
      this.userAuthState$.next(true);
      return this.user;
    });
  }

  signOut() {
    this.user = {
      authStatus: authStatus.anonymous
    };
    this.userAuthState$.next(null);
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
}
