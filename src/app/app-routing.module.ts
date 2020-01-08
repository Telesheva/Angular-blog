import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {PostsListComponent} from './components/posts-list/posts-list.component';
import {PostFormComponent} from './components/post-form/post-form.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'posts', component: PostsListComponent},
  {path: 'posts/add', component: PostFormComponent},
  {path: '', component: PostsListComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
