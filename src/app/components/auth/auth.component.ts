import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {IsLoadingService} from '../../services/isLoading/is-loading.service';

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
  loading: boolean;
  private isLoadingSubscription;

  constructor(private auth: AuthService, private isLoadingService: IsLoadingService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
    this.eventAuthErrorSubscription = this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });
    this.isLoadingSubscription = this.isLoadingService.isLoading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }

  ngOnDestroy() {
    this.eventAuthErrorSubscription.unsubscribe();
    this.isLoadingSubscription.unsubscribe();
  }

  createUser(form) {
    this.auth.createUser(form.value);
  }

  loginUser(form) {
    this.auth.loginUser(form.value);
  }
}
