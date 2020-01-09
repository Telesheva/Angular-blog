import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../../services/post/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  form: FormGroup;
  isAddPost = this.router.url === '/posts/add';
  title: string;
  description: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private  postService: PostService,
    private route: ActivatedRoute
  ) {
    const post = JSON.parse(localStorage.getItem('post'));
    if (!this.isAddPost) {
      this.title = post.title;
      this.description = post.description;
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  onAddPostBtnClick(form: FormGroup) {
    this.postService.add(form.value);
  }

  onSaveBtnClick(form: FormGroup) {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.editPost(form.value, id);
  }
}
