import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {
  }

  @HostListener('window:load', ['$event']) loadHandler() {
    const users = JSON.parse(localStorage.getItem('users'));
    const userEmail = localStorage.getItem('email');
    if (userEmail) {
      const findUser = users.find(user => user.email === userEmail);
      this.auth.autoLogIn(findUser);
    }
  }

  ngOnInit(): void {

  }
}
