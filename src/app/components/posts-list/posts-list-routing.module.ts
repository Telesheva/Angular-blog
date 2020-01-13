import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostsListComponent} from './posts-list.component';
import {PostComponent} from '../post/post.component';
import {PostFormComponent} from '../post-form/post-form.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    pathMatch: 'full'
  },
  {path: 'post/add', component: PostFormComponent},
  {path: 'post/:id', component: PostComponent, pathMatch: 'full'},
  {path: 'post/:id/edit', component: PostFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PostsListRoutingModule {}
