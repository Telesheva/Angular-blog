import { Component, HostListener, OnInit } from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
  }

  @HostListener('window:load', ['$event']) loadHandler() {
    const users = JSON.parse(localStorage.getItem('users'));
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const findUser = users.find(user => user.email === userEmail.toLowerCase());
      this.auth.autoLogIn(findUser);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  ngOnInit(): void {
  }
}
