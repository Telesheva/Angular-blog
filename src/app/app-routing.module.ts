import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(mod => mod.AuthModule) },
  { path: '', loadChildren: () => import('./components/posts-list/posts-list.module').then(mod => mod.PostsListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
