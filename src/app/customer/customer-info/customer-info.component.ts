import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { Router } from '@angular/router';
import { CustomerModel } from '../../interfaces/customer.interface';
import { Validators, FormBuilder } from '@angular/forms';
import { UpdateCustomerModel } from '../../interfaces/update-customer.model';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent implements OnInit {

  customer!: CustomerModel;
  disabledToEdit = true;

  formUser = this.fb.group({
    documentType: this.fb.nonNullable.control('',
    {validators: [Validators.required]}),

    document: this.fb.nonNullable.control('',
    {validators: [Validators.required]}),

    fullName: this.fb.nonNullable.control('',
    {validators: [Validators.required]}),

    email: this.fb.nonNullable.control('',
    {validators: [Validators.required, Validators.email]}),

    phone: this.fb.nonNullable.control('',
    {validators: [Validators.required]}),
  });

  constructor(private service: ServiceService,
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.service.getCustomerInfo()
    .subscribe(customer => this.customer = customer);
  }

  cancelUpdate() {
    this.formUser = this.fb.group({
      documentType: this.fb.nonNullable.control(this.customer.documentType.name,
      {validators: [Validators.required]}),

      document: this.fb.nonNullable.control(this.customer.document,
      {validators: [Validators.required]}),

      fullName: this.fb.nonNullable.control(this.customer.fullName,
      {validators: [Validators.required]}),

      email: this.fb.nonNullable.control(this.customer.email,
      {validators: [Validators.required, Validators.email]}),

      phone: this.fb.nonNullable.control(this.customer.phone.toString(),
      {validators: [Validators.required]}),
    });
  }

  clickEdit() {
    this.formUser = this.fb.group({
      documentType: this.fb.nonNullable.control(this.customer.documentType.name,
      {validators: [Validators.required]}),

      document: this.fb.nonNullable.control(this.customer.document,
      {validators: [Validators.required]}),

      fullName: this.fb.nonNullable.control(this.customer.fullName,
      {validators: [Validators.required]}),

      email: this.fb.nonNullable.control(this.customer.email,
        {validators: [Validators.required, Validators.email]}),

        phone: this.fb.nonNullable.control(this.customer.phone.toString(),
        {validators: [Validators.required]}),
      });

      this.disabledToEdit = false;
  }

  updateCustomer() {

    if(this.formUser.valid) {
      console.log('Empezando')
      const user: UpdateCustomerModel = this.formUser.getRawValue();
      console.log('Capturando User')

      this.service.updateCustomer(user)
      console.log('Update')

      this.service.getCustomerInfo()
      .subscribe(customer => this.customer = customer);
      console.log('Set user')

      this.disabledToEdit = true;
    }
  }
}
