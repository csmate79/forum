import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/home-page.component';
import { HomePageRoutingModule } from '../profile-page/profile-page-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HasPermissionPipe } from '../pipes/has-permission.pipe';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomePageRoutingModule,
    MatButtonModule,
    MatInputModule,
    HasPermissionPipe,
  ],
})
export class HomePageModule {}
