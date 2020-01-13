import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {PostsListComponent} from './components/posts-list/posts-list.component';
import {PostFormComponent} from './components/post-form/post-form.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PostComponent} from './components/post/post.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(mod => mod.AuthModule) },
  { path: '', loadChildren: () => import('./components/posts-list/posts-list.module').then(mod => mod.PostsListModule) }
  /*{path: '', component: AuthComponent, pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
