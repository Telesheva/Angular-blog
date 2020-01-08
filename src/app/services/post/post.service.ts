import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {PostInterface} from '../../interfaces/post.interface';
import uuidv1 from 'uuid/v1';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts = [];
  post: PostInterface;

  constructor(
    private db: AngularFirestore,
    private router: Router
  ) {}

  getAllPosts() {
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

  add(post): void {
    const ID = uuidv1();
    this.db.doc(`/posts/${ID}`).set({
      id: ID,
      title: post.title,
      description: post.description
    }).then(() => {
      window.alert('New post was successfully added!');
      this.router.navigate(['/posts']);
    })
      .catch(error => {
        window.alert(error);
      });
  }
}
