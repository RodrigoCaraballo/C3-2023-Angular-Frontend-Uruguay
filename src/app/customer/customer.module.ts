import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerChangePasswordComponent, CustomerInfoComponent } from './';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';



@NgModule({
  declarations: [
    CustomerChangePasswordComponent,
    CustomerInfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [CustomerChangePasswordComponent,
    CustomerInfoComponent,]
})
export class CustomerModule { }
