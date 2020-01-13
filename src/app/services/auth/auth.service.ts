import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import * as firebase from 'firebase';
import {UserInterface} from '../../interfaces/user.interface';
import {IsLoadingService} from '../isLoading/is-loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  users: UserInterface[];
  curUser: UserInterface;
  adminEmail = 'admin@gmail.com';

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private isLoadingService: IsLoadingService,
    private router: Router
  ) {}

  getUsers() {
    const users = [];
    this.db.collection('users').get().forEach(querySnap => {
      querySnap.forEach(doc => {
        if (doc.exists) {
          users.push(doc.data());
          this.users = users;
          return this.users;
        }
      });
    }).catch(error => {
      this.eventAuthError.next(error);
    });
  }

  loginUser(user) {
    this.getUsers();
    this.isLoadingService.add();
    const newUser = {
      email: user.email,
      role: user.email === this.adminEmail ? 'admin' : 'user'
    };
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.curUser = newUser;
        localStorage.setItem('email', user.email);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.isLoadingService.remove();
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  createUser(user) {
    const newUser = {
      email: user.email,
      role: user.email === this.adminEmail ? 'admin' : 'user'
    };
    this.isLoadingService.add();
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.curUser = newUser;
        localStorage.setItem('email', user.email);

        this.insertUserData(newUser, userCredential)
          .then(() => {
            localStorage.setItem('users', JSON.stringify(this.users));
            this.isLoadingService.remove();
            this.router.navigate(['/']);
          });
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(user, userCredential) {
    this.getUsers();
    if (!this.users.includes(user)) {
      return this.db.doc(`/users/${userCredential.user.uid}`).set(user);
    }
  }

  autoLogIn(user) {
    // this.users = JSON.parse(localStorage.getItem('users'));
    if (user) {
      this.curUser = user;
    }
  }
}
