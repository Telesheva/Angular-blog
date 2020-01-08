import {Component, Input, OnInit} from '@angular/core';
import {PostService} from '../../services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private postService: PostService) {
  }

  ngOnInit() {
  }

}
