import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoadingService {
  loading: boolean;
  isLoading$ = new BehaviorSubject(this.loading);

  constructor() {
  }

  add() {
    this.isLoading$.next(true);
  }

  remove() {
    this.isLoading$.next(false);
  }
}
