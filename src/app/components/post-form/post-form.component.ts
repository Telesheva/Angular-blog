import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {PostsListComponent} from '../posts-list/posts-list.component';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  form: FormGroup;
  isAddPost = this.router.url === '/posts/add';

  constructor(private auth: AuthService, private router: Router, private postsListComponent: PostsListComponent) {
    if (!auth.curUser) {
      this.router.navigate(['/auth']);
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

}
