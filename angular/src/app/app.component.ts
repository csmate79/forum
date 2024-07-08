import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { login } from './store/actions/auth.actions';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular';

  constructor(
    private api: ApiService,
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (
      typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage?.getItem('userId')
    ) {
      this.api
        .getUser(localStorage.getItem('userId')!)
        .pipe(
          tap((userData) => {
            const user = userData.data;
            this.store.dispatch(login({ user: user }));
            this.authService.user$.next(user);
          })
        )
        .subscribe();
    }
  }
}
