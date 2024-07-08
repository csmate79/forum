import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../enums/roles.enum';
import { UserPermission } from '../enums/rights.enum';
import { RolePermissionsMap } from '../global/role-permission-map';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { selectUser } from '../store/selectors/auth.selectors';

@Pipe({
  name: 'hasPermission',
  standalone: true,
})
export class HasPermissionPipe implements PipeTransform {
  private user$!: Observable<IUser>;

  constructor(private store: Store) {
    this.user$ = store.select(selectUser);
  }

  transform(permission: UserPermission, userRole?: UserRole): boolean {
    let hasPermission = false;
    if (userRole) {
      hasPermission =
        RolePermissionsMap[UserRole[userRole]]?.includes(permission);
    } else {
      this.user$.subscribe((res) => {
        hasPermission =
          RolePermissionsMap[UserRole[(res as any)?.role]]?.includes(
            permission
          );
      });
    }

    return hasPermission;
  }
}
