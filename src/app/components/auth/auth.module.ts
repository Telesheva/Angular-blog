import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {LoaderModule} from '../UI/loader/loader.module';
import {ButtonModule} from '../UI/button/button.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    LoaderModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AuthComponent]
})
export class AuthModule {
}
