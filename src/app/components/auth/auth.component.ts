import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLogIn = false;
  authError: any;
  private eventAuthErrorSubscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.eventAuthErrorSubscription = this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });
  }

  ngOnDestroy() {
    this.eventAuthErrorSubscription.unsubscribe();
  }

  createUser(form) {
    this.auth.createUser(form.value);
  }

  loginUser(form) {
    this.auth.loginUser(form.value);
  }
}
