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
    const newPost = {
      id: ID,
      title: post.title,
      description: post.description
    };
    this.db.doc(`/posts/${ID}`).set(newPost).then(() => {
      this.posts.push(newPost);
      this.posts$.next(this.posts);
      window.alert('New post was successfully added!');
      this.router.navigate(['/posts']);
    })
      .catch(error => {
        window.alert(error);
      });
  }

  editPost(post: PostInterface, id: string): void {
    const newPost = {
      id,
      title: post.title,
      description: post.description
    };
    this.db.doc(`/posts/${id}`).update(newPost).then(() => {
      const oldPost = JSON.parse(localStorage.getItem('post'));
      const oldPostIndex = this.posts.findIndex(el => el.id === oldPost.id);
      this.posts.splice(oldPostIndex, 1, newPost);
      this.posts$.next(this.posts);
      this.router.navigate(['/posts']);
      localStorage.removeItem('post');
    })
      .catch(error => {
        window.alert(error);
      });
  }
}
