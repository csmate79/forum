import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
}
