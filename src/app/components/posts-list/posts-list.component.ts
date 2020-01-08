import {Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) {
    if (!auth.curUser) {
      this.router.navigate(['/auth']);
    }
  }

  ngOnInit() {
    console.log(localStorage);
  }

  onLogOutBtnClick() {
    this.router.navigate(['/auth']);
    localStorage.removeItem('email');
    localStorage.removeItem('users');
  }
}
