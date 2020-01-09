import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ButtonComponent } from './components/UI/button/button.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {environment} from '../environments/environment';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PostComponent} from './components/post/post.component';
import { LoaderComponent } from './components/UI/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ButtonComponent,
    PostsListComponent,
    PostFormComponent,
    PageNotFoundComponent,
    PostComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
