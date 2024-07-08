import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPageComponent } from './components/admin-page.component';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { HasPermissionPipe } from '../pipes/has-permission.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminPageRoutingModule,
    FormsModule,
    HasPermissionPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    DragDropModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  providers: [HasPermissionPipe],
})
export class AdminPageModule {}
