import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ProfilePageComponent } from './components/profile-page.component';
import { ProfilePageRoutingModule } from '../home-page/home-page-routing.module';
import { HasPermissionPipe } from '../pipes/has-permission.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule,
    HasPermissionPipe,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class ProfilePageModule {}
