import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import {PostInterface} from '../../interfaces/post.interface';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit, OnDestroy {
  // loading: boolean;
  posts: PostInterface[];
  private postsSubscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.postsSubscription = this.postService.posts$.subscribe((posts: PostInterface[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  onLogOutBtnClick() {
    this.router.navigate(['/auth']);
    localStorage.removeItem('email');
    localStorage.removeItem('users');
  }

  onViewPostBtnClick(id) {
    this.router.navigate(['/post']);
    this.postService.fetchOnePost(id);
  }
}
