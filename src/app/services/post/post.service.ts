import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {PostInterface} from '../../interfaces/post.interface';
import uuidv1 from 'uuid/v1';
import {BehaviorSubject} from 'rxjs';

// import {BehaviorSubject} from 'rxjs';

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

  fetchOnePost(id) {
    this.db.collection('posts')
      .get().forEach(querySnap => {
      querySnap.forEach(doc => {
        if (doc.id === id && doc.exists) {
          this.post = {
            id: doc.data().id,
            title: doc.data().title,
            description: doc.data().description
          };
          return this.post;
        }
      });
    }).catch(error => {
      window.alert(error);
    });
  }

  add(post): void {
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
}
