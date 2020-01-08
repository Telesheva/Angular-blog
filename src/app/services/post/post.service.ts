import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {PostInterface} from '../../interfaces/post.interface';
import uuidv1 from 'uuid/v1';

// import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts = [];
  // posts$: BehaviorSubject<PostService[]> = new BehaviorSubject(this.posts);
  post: PostInterface;
  postReceivedById: PostInterface;

  constructor(
    private db: AngularFirestore,
    private router: Router
  ) {
  }

  fetchAllPosts() {
    this.db.collection('posts')
      .get().forEach(querySnap => {
      querySnap.forEach(doc => {
        if (doc.exists) {
          this.posts.push(doc.data());
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
          console.log(this.post);
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
      window.alert('New post was successfully added!');
      this.fetchAllPosts();
      this.router.navigate(['/posts']);
    })
      .catch(error => {
        window.alert(error);
      });
  }
}
