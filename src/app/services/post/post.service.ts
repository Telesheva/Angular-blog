import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {PostInterface} from '../../interfaces/post.interface';
import uuidv1 from 'uuid/v1';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsArr = [];
  posts: PostInterface[];
  posts$: BehaviorSubject<PostInterface[]> = new BehaviorSubject(this.posts);
  post: PostInterface;

  constructor(
    private db: AngularFirestore,
    private router: Router
  ) {
    this.fetchAllPosts();
  }

  fetchAllPosts() {
    this.db.collection('posts')
      .get().forEach(querySnap => {
      querySnap.forEach(doc => {
        if (doc.exists) {
          this.postsArr.push(doc.data());
          this.posts = this.postsArr;
          this.posts$.next(this.posts);
        }
      });
    }).catch(error => {
      console.log(error);
    });
    return this.posts;
  }

  fetchOnePost(id: string) {
    this.db.collection('posts')
      .get().forEach(querySnap => {
      querySnap.forEach(doc => {
        if (doc.id === id && doc.exists) {
          this.post = {
            id: doc.data().id,
            title: doc.data().title,
            description: doc.data().description
          };
          localStorage.setItem('post', JSON.stringify(this.post));
          return this.post;
        }
      });
    }).catch(error => {
      window.alert(error);
    });
  }

  add(post: PostInterface): void {
    const ID = uuidv1();
    this.db.doc(`/posts/${ID}`).set({
      id: ID,
      title: post.title,
      description: post.description
    }).then(() => {
      this.posts.push(post);
      this.posts$.next(this.posts);
      window.alert('New post was successfully added!');
      this.router.navigate(['/posts']);
    })
      .catch(error => {
        window.alert(error);
      });
  }

  editPost(post: PostInterface, id: string): void {
    this.db.doc(`/posts/${id}`).update({
      id,
      title: post.title,
      description: post.description
    }).then(() => {
      this.router.navigate(['/posts']);
      this.posts$.next(this.posts);
      localStorage.removeItem('post');
    })
      .catch(error => {
        window.alert(error);
      });
  }
}
