import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  @HostListener('window:load', ['$event']) loadHandler() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.auth.autoLogIn(user);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  ngOnInit(): void {
  }
}
