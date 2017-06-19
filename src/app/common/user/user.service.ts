import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth/auth';
import { AngularFireDatabase } from 'angularfire2/database/database';
import * as firebase from 'firebase/app';


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
  userAuthData$: Observable<any>;
  authError: any = null;

  constructor(public afAuth: AngularFireAuth, private afDB: AngularFireDatabase) {
    this.startAuth();
    this.userAuthData$ = afAuth.authState;
    const userDetails$ = this.userAuthData$.switchMap(user => {
      return user ? this.getUserDetails(user) : Observable.of(null);
    });

    userDetails$.subscribe(user => {
      this.user = user;
      if (user) {
        this.authState = authStates.authenticated;
        if (!user.displayName) {
          this.user.displayName = this.user.email.split('@')[0];
        }
      } else {
        this.authState = authStates.anonymous;
      }
      return this.user;
    })
  }

  getUserDetails(user) {
    return this.afDB.object(`users/${user.uid}`)
      .map(userDetails => Object.assign({}, user, userDetails));
  }

  signOut() {
    this.authState = authStates.pending;
    this.afAuth.auth.signOut()
      .then(() => {
        this.user = {};
        this.authState = authStates.anonymous;
      });
  }

  signInWithGoogle() {
    this.startAuth();

    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .catch(err => this.handleAuthError('error signing in:', err));
  }

  signInWithPassword(user) {
    this.startAuth();

    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .catch(err => this.handleAuthError('error signing in:', err));
  };

  signUp(user) {
    this.startAuth();

    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(err => this.handleAuthError('error signing up:', err));
  }

  handleAuthError(message: String, err) {
    this.user = {};
    this.authState = authStates.anonymous;
    console.error(message, err);
    this.authError = err;
    throw err;
  }

  startAuth() {
    this.authError = null;
    this.authState = authStates.pending;
  }
}
