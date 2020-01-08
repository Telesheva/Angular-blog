import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  // loading: boolean;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onLogOutBtnClick() {
    this.router.navigate(['/auth']);
    localStorage.removeItem('email');
    localStorage.removeItem('users');
  }
}
