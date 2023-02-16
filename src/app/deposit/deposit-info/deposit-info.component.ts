import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../../service/service.service';
import { FormBuilder } from '@angular/forms';
import { AccountModel } from '../../interfaces/account.model';

@Component({
  selector: 'app-deposit-info',
  templateUrl: './deposit-info.component.html',
  styleUrls: ['./deposit-info.component.scss']
})
export class DepositInfoComponent implements OnInit{

  accounts!: AccountModel[];

  @Output() idSend = new EventEmitter<string>();

  constructor(private service: ServiceService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAccounts()
  }

  formAccount = this.fb.group({
    id: [''],
  })

  getAccounts() {
    this.service.getAccounts()
    .subscribe(accounts => this.accounts = accounts);
  }

  sendId() {
    if(this.formAccount.controls.id.value != null) {
      this.idSend.emit(this.formAccount.controls.id.value);
    }
  }
}
