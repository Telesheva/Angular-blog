import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import * as firebase from 'firebase';
import {UserInterface} from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  users = [];
  curUser: UserInterface;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {}

  getUsers() {
    this.db.collection('users')
      .get().forEach(querySnap => {
      querySnap.forEach(doc => {
        if (doc.exists) {
          this.users.push(doc.data());
        }
      });
    }).catch(error => {
      this.eventAuthError.next(error);
    });
    return this.users;
  }

  loginUser(user) {
    this.getUsers();
    const newUser = {
      email: user.email,
      role: user.email === 'admin@gmail.com' ? 'admin' : 'user'
    };
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.curUser = newUser;
        localStorage.setItem('email', user.email);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.router.navigate(['/posts']);
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.curUser = user;
        localStorage.setItem('email', user.email);

        this.insertUserData(userCredential)
          .then(() => {
            localStorage.setItem('users', JSON.stringify(this.users));
            this.router.navigate(['/posts']);
          });
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    this.getUsers();
    if (!this.users.includes(userCredential.user)) {
      return this.db.doc(`/users/${userCredential.user.uid}`).set({
        email: this.curUser.email,
        role: this.curUser.email === 'admin@gmail.com' ? 'admin' : 'user'
      });
    }
  }

  autoLogIn(user) {
    if (user) {
      this.curUser = user;
    }
  }
}
