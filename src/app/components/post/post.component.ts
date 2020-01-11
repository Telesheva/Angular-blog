import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {PostInterface} from '../../interfaces/post.interface';
import {IsLoadingService} from '../../services/isLoading/is-loading.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  private id: string;
  private post: PostInterface;
  private isAdmin = this.auth.curUser.role === 'admin';
  loading: boolean;

  private postSubscription;
  private isLoadingSubscription;

  constructor(
    private postService: PostService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private isLoadingService: IsLoadingService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.postService.fetchOnePost(this.id);
    this.postSubscription = this.postService.post$.subscribe((post: PostInterface) => {
      this.post = post;
    });
    this.isLoadingSubscription = this.isLoadingService.isLoading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }

  onEditPostBtnClick() {
    this.router.navigate([`/posts/edit/${this.id}`]);
  }
}
