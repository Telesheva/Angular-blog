import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  id: string;
  isAdmin = this.auth.curUser.role === 'admin';

  constructor(
    private postService: PostService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  onEditPostBtnClick() {
    this.router.navigate([`/posts/edit/${this.id}`]);
  }
}
