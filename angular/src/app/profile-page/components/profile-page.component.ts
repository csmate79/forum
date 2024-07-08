import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/selectors/auth.selectors';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user.interface';
import { ITopic } from '../../interfaces/topic.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  public loggedInUser!: IUser;

  public userForm!: FormGroup;

  public passwordForm!: FormGroup;

  public user: any;

  public roles: any;

  public userActivities!: { topics: number; comments: number };

  public permissions = [
    { name: 'Read Comments', bit: 1 },
    { name: 'Add/Delete Comments', bit: 2 },
    { name: 'Add/Delete Topics', bit: 4 },
    { name: "Delete Others' Comments/Topics", bit: 8 },
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.store.select(selectUser).subscribe((user) => {
      this.loggedInUser = user;
    });

    this.loadUser();
    this.loadRoles();

    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group(
      {
        password1: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}'),
          ],
        ],
        password2: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch }
    );

    this.api.getUser(this.loggedInUser?.id).subscribe((user) => {
      this.user = user.data;
      this.userForm.patchValue(user);

      this.api.getTopics().subscribe((topics) => {
        this.countUserActivities(topics.data, user.data.id);
      });
    });
  }

  loadUser(): void {
    this.api.getUser(this.loggedInUser?.id).subscribe((user) => {
      this.user = user.data;
      this.userForm.patchValue(user.data);
    });
  }

  loadRoles(): void {
    this.api.getRoles().subscribe((roles) => {
      this.roles = roles.data;
    });
  }

  updateUser(): void {
    if (this.userForm.valid) {
      this.api.updateUser(this.user.data.id, this.userForm.value).subscribe();
    }
  }

  updatePassword(): void {
    if (this.passwordForm.valid) {
      const { password1, password2 } = this.passwordForm.value;
      this.api
        .updatePassword(this.user.id, { password1, password2 })
        .subscribe(() => {
          this.passwordForm.reset();
          this.passwordForm.markAsPristine();
        });
    }
  }

  passwordsMatch(group: FormGroup): { [key: string]: any } | null {
    return group.get('password1')?.value === group.get('password2')?.value
      ? null
      : { notMatching: true };
  }

  countUserActivities(data: ITopic[], userId: string): void {
    let topicCount = 0;
    let commentCount = 0;

    const countComments = (comments: any[]) => {
      comments.forEach((comment) => {
        if (comment.author.id === userId) {
          commentCount++;
        }
        if (comment.comments && comment.comments.length > 0) {
          countComments(comment.comments);
        }
      });
    };

    data.forEach((topic) => {
      if (topic.author.id === userId) {
        topicCount++;
      }
      if (topic.comments && topic.comments.length > 0) {
        countComments(topic.comments);
      }
    });

    this.userActivities = { topics: topicCount, comments: commentCount };
  }
}
