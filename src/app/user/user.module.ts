import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModelComponent } from './auth-model/auth-model.component';


@NgModule({
  declarations: [
    AuthModelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AuthModelComponent
  ]
})
export class UserModule { }
