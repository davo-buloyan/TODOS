import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { signOut } from  '@app/store/auth';
import { IAppState, selectAuthUser, selectIsLoggedIn } from '@app/store'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todos';

  authUser$ = this.store.select(selectAuthUser);
  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  constructor(private store: Store<IAppState>) {}

  onLogOut() {
    this.store.dispatch(signOut());
  }
}
