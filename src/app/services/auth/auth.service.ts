import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {UserInterface} from '../../interfaces/user.interface';
import {IsLoadingService} from '../isLoading/is-loading.service';
import {zonedTimeToUtc} from 'date-fns-tz';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();
  curUser: UserInterface;
  adminEmail = 'admin@gmail.com';   // password for admin: 12345678

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private isLoadingService: IsLoadingService,
    private router: Router
  ) {
  }

  loginUser(user) {
    const newUser = {
      email: user.email,
      role: user.email === this.adminEmail ? 'admin' : 'user'
    };
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.curUser = newUser;

        localStorage.setItem('user', JSON.stringify(newUser));

        this.isLoadingService.add();
        this.eventAuthError.next('');
        this.setUserToken();

        this.router.navigate(['/']);

        this.isLoadingService.remove();
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
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.curUser = newUser;

        this.isLoadingService.add();
        this.eventAuthError.next('');

        localStorage.setItem('user', JSON.stringify(newUser));

        this.insertUserData(newUser, userCredential)
          .then(() => {
            this.setUserToken();
            this.router.navigate(['/']);
            this.isLoadingService.remove();
          });
      })
      .catch(error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(user, userCredential) {
    return this.db.doc(`/users/${userCredential.user.uid}`).set(user);
  }

  setUserToken() {
    this.afAuth.auth.currentUser.getIdTokenResult(true).then((idTokenResult) => {
      localStorage.setItem('expTime', idTokenResult.expirationTime);
      return idTokenResult;
    });
  }

  autoLogIn(user) {
    const expTime = localStorage.getItem('expTime');
    const utcExpireDate = zonedTimeToUtc(new Date(expTime), 'Europe/Kiev').getTime();
    if (utcExpireDate <= new Date().getTime()) {
      window.alert('Your time is over. Please, log in again.');
      this.logout();
    } else {
      this.curUser = user;
    }
  }

  logout() {
    this.router.navigate(['/auth']);
    localStorage.removeItem('expTime');
    localStorage.removeItem('user');
  }
}
