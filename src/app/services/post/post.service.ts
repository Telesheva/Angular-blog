import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {PostInterface} from '../../interfaces/post.interface';
import uuidv1 from 'uuid/v1';
import {BehaviorSubject} from 'rxjs';
import {IsLoadingService} from '../isLoading/is-loading.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // postsArr = [];
  posts: PostInterface[];
  post: PostInterface;
  posts$: BehaviorSubject<PostInterface[]> = new BehaviorSubject(this.posts);
  post$: BehaviorSubject<PostInterface> = new BehaviorSubject(this.post);

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private isLoadingService: IsLoadingService
  ) {}

  fetchAllPosts() {
    const newPosts = [];
    this.isLoadingService.add();
    this.db.collection('posts').get().forEach(querySnap => {
      querySnap.forEach(doc => {
        if (doc.exists) {
          newPosts.push(doc.data());
          this.posts = newPosts;
          this.posts$.next(this.posts);
          this.isLoadingService.remove();
        }});
    }).catch(error => {
      window.alert(error);
    });
    return this.posts;
  }

  fetchOnePost(id: string) {
    this.isLoadingService.add();
    this.db.collection('posts')
      .get().forEach(querySnap => {
      querySnap.forEach(doc => {
        if (doc.id === id && doc.exists) {
          this.post = {
            id: doc.data().id,
            title: doc.data().title,
            description: doc.data().description
          };
          this.post$.next(this.post);
          this.isLoadingService.remove();
          return this.post;
        }
      });
    }).catch(error => {
      window.alert(error);
    });
  }

  addPost(post: PostInterface): void {
    const ID = uuidv1();
    const newPost = {
      id: ID,
      title: post.title,
      description: post.description
    };
    this.db.doc(`/posts/${ID}`).set(newPost).then(() => {
      this.posts.push(newPost);
      this.posts$.next(this.posts);
      this.router.navigate(['/posts']);
    })
      .catch(error => {
        window.alert(error);
      });
  }

  editPost(post: PostInterface, id: string): void {
    this.db.doc(`/posts/${id}`).update(post).then(() => {
      const oldPostIndex = this.posts.findIndex(el => el.id === id);
      this.posts.splice(oldPostIndex, 1, post);
      this.posts$.next(this.posts);
      this.router.navigate(['/posts']);
    })
      .catch(error => {
        window.alert(error);
      });
  }
}
