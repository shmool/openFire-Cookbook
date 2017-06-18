import { Injectable } from '@angular/core';

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

  constructor() {
    this.startPending();
    setTimeout(() => {
      this.signOut();
    }, 2000);
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

  signOut() {
    this.user = {
      authStatus: authStatus.anonymous
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
      return this.user;
    });
  }

  startPending() {
    this.user = {
      authStatus: authStatus.pending
    };
  }
}
