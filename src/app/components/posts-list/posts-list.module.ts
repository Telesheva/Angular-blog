import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostsListComponent} from './posts-list.component';
import {PostComponent} from '../post/post.component';
import {PostFormComponent} from '../post-form/post-form.component';
import {PostsListRoutingModule} from './posts-list-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderModule} from '../UI/loader/loader.module';
import {ButtonModule} from '../UI/button/button.module';

@NgModule({
  imports: [
    CommonModule,
    PostsListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    ButtonModule
  ],
  declarations: [
    PostsListComponent,
    PostComponent,
    PostFormComponent
  ]
})
export class PostsListModule {
}
