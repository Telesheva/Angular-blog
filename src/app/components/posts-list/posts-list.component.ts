import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {PostService} from '../../services/post/post.service';
import {PostInterface} from '../../interfaces/post.interface';
import {IsLoadingService} from '../../services/isLoading/is-loading.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})

export class PostsListComponent implements OnInit, OnDestroy {
  posts: PostInterface[];
  loading: boolean;
  private postsSubscription;
  private isLoadingSubscription;
  private routerLink: string;

  constructor(
    private router: Router,
    private postService: PostService,
    private isLoadingService: IsLoadingService
  ) {
  }

  ngOnInit() {
    this.postsSubscription = this.postService.posts$.subscribe((posts: PostInterface[]) => {
      this.posts = posts;
    });
    this.postService.fetchAllPosts();
    this.isLoadingSubscription = this.isLoadingService.isLoading$.subscribe((loading: boolean) => {
    this.loading = loading;
    });
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.isLoadingSubscription.unsubscribe();
  }

  onLogOutBtnClick() {
    this.router.navigate(['/auth']);
    localStorage.removeItem('email');
    localStorage.removeItem('users');
  }

  onViewPostBtnClick(id: string) {
    this.postService.fetchOnePost(id);
  }

  getLink(id: string) {
    this.routerLink = `post/${id}`;
    return this.routerLink;
  }
}
