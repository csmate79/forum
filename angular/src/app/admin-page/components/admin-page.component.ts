import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { IRole } from '../../interfaces/role.interface';
import { IUser } from '../../interfaces/user.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {
  roles: IRole[] = [];
  selectedRole: IRole | null = null;
  users: IUser[] = [];
  roleUsers: IUser[] = [];
  otherUsers: IUser[] = [];

  roleForm!: FormGroup;

  constructor(private fb: FormBuilder, private forumService: ApiService) {
    this.initForm();
  }

  initForm() {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
      readComments: [false],
      addDeleteComments: [false],
      addDeleteTopics: [false],
      deleteOthers: [false],
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.forumService.getRoles().subscribe((roles) => {
      this.roles = roles.data;
    });
  }

  onRoleChange(roleId: string): void {
    this.forumService.getRole(roleId).subscribe((role) => {
      this.initForm();
      this.selectedRole = role.data;
      this.loadUsersOfRole(roleId);
      this.populateRoleForm(role.data);
    });
  }

  loadUsersOfRole(roleId: string): void {
    this.forumService.getUsersOfRole(roleId).subscribe((roleUsers) => {
      this.roleUsers = roleUsers.data;
      this.loadAllUsers();
    });
  }

  loadAllUsers(): void {
    this.forumService.getUsers().subscribe((users) => {
      this.users = users.data;
      this.otherUsers = users.data.filter(
        (user: any) => user.role !== this.selectedRole?.id
      );
    });
  }

  populateRoleForm(role: IRole): void {
    this.roleForm.setValue({
      name: role.name,
      readComments: (role.rights & 1) === 1,
      addDeleteComments: (role.rights & 2) === 2,
      addDeleteTopics: (role.rights & 4) === 4,
      deleteOthers: (role.rights & 8) === 8,
    });
  }

  updateRole(): void {
    if (this.selectedRole) {
      const updatedRole: IRole = {
        ...this.selectedRole,
        name: this.roleForm.value.name,
        rights:
          (this.roleForm.value.readComments ? 1 : 0) |
          (this.roleForm.value.addDeleteComments ? 2 : 0) |
          (this.roleForm.value.addDeleteTopics ? 4 : 0) |
          (this.roleForm.value.deleteOthers ? 8 : 0),
      };

      this.forumService
        .updateRole(updatedRole.id, updatedRole)
        .subscribe(() => {
          this.loadRoles();
        });
    }
  }

  addUserToRole(userId: string): void {
    const user = this.users.find((user) => user.id === userId);
    if (user && this.selectedRole) {
      user.role = this.selectedRole.id;
      this.forumService.updateUser(user.id, user).subscribe(() => {
        this.loadUsersOfRole(this.selectedRole!.id);
      });
    }
  }

  removeUserFromRole(userId: string): void {
    const user = this.users.find((user) => user.id === userId);
    if (user) {
      user.role = '';
      this.forumService.updateUser(user.id, user).subscribe(() => {
        this.loadUsersOfRole(this.selectedRole!.id);
      });
    }
  }
}
