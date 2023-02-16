import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CreateDepositModel } from '../../interfaces/create-deposit.model';
import { ServiceService } from '../../service/service.service';
import { AccountModel } from '../../interfaces/account.model';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-deposit-form',
  templateUrl: './create-deposit-form.component.html',
  styleUrls: ['./create-deposit-form.component.scss']
})
export class CreateDepositFormComponent implements OnInit{

  accounts!: AccountModel[];

  selectedId = '';
  amount = 0;
  selectedOption?: string;

  constructor(private service: ServiceService,
    private router: Router,
    private fb: FormBuilder) {}

  formDeposit = this.fb.group({
    accountId: ['', Validators.required],
    amount: ['', Validators.required]
  })

  ngOnInit(): void {
    this.getAccounts()
  }

  getAccounts() {
    this.service.getAccounts()
    .subscribe(accounts => this.accounts = accounts)
  }

  createDeposit() {
    if(this.formDeposit.controls.accountId.value != 'Select an Account' && this.formDeposit.controls.accountId.value != '' && this.formDeposit.controls.accountId.value
    && this.formDeposit.controls.amount.value) {

      const deposit: CreateDepositModel = {
        accountId: this.formDeposit.controls.accountId.value,
        amount: parseInt(this.formDeposit.controls.amount.value)
      }

      this.service.createDeposit(deposit)
      this.router.navigate(['/dashboard'])
    }
  }


}
