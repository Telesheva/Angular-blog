import {Component, OnInit} from '@angular/core';
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

  constructor(
    private auth: AuthService,
    private router: Router,
    private  postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
    if (!this.isAddPost) {
      this.form.controls.title.setValue(this.postService.post.title);
      this.form.controls.description.setValue(this.postService.post.description);
    }
  }

  onAddPostBtnClick(form: FormGroup) {
    this.postService.addPost(form.value);
  }

  onSaveBtnClick(form: FormGroup) {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.editPost(form.value, id);
  }
}
