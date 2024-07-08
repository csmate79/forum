import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { login } from '../../store/actions/auth.actions';
import { BehaviorSubject, tap } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import { selectUser } from '../../store/selectors/auth.selectors';
import { UserPermission } from '../../enums/user-permissions.enum';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public user$: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);

  public topics: any[] = [];
  public topicForm!: FormGroup;

  public userDetails!: IUser;

  public loginForm!: FormGroup;

  public commentVisibility: boolean[] = [];

  public readonly UserPermission = UserPermission;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private api: ApiService
  ) {
    this.loginForm = fb.group({
      username: [],
      password: [],
    });

    store.select(selectUser).subscribe((res) => {
      this.user$.next(res);
    });
  }

  ngOnInit(): void {
    this.loadTopics();

    this.topicForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  loadTopics(): void {
    this.api.getTopics().subscribe((topics) => (this.topics = topics.data));
  }

  addTopic(): void {
    if (this.topicForm.valid) {
      this.api
        .addTopic(this.topicForm.value)
        .subscribe(() => this.loadTopics());
    }
  }

  addComment(topicId: string, content: string): void {
    // if (content) {
    //   this.api
    //     .addComment(topicId, { content })
    //     .subscribe(() => this.loadTopics());
    // }
  }

  deleteComment(topicId: string, commentId: string): void {
    this.api
      .deleteComment(topicId, commentId)
      .subscribe(() => this.loadTopics());
  }

  public onLogin() {
    if (this.loginForm.valid) {
      this.api
        .getUsers()
        .pipe(
          tap((users) => {
            users.data.forEach((user: any) => {
              if (
                user.name === this.loginForm.get('username')?.value &&
                user.password === this.loginForm.get('password')?.value
              ) {
                this.userDetails = user;
                localStorage.setItem('userId', JSON.stringify(user.id));
                this.store.dispatch(login({ user }));
              }
            });
          })
        )
        .subscribe();
    }
  }

  public onAddTitle() {
    this.api
      .addTopic({
        title: this.topicForm.get('title')?.value,
        body: this.topicForm.get('body')?.value,
      })
      .pipe(
        tap(() => {
          this.loadTopics();
        })
      )
      .subscribe();
    this.topicForm.reset();
  }

  public toggleCommentVisibility(index: number) {
    this.commentVisibility[index] = !this.commentVisibility[index];
  }
}
