import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { AccountModel } from '../../interfaces/account.model';
import { ServiceService } from '../../service/service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transfer-info',
  templateUrl: './transfer-info.component.html',
  styleUrls: ['./transfer-info.component.scss']
})
export class TransferInfoComponent implements OnInit{

  accounts!: AccountModel[];

  @Output() idSend = new EventEmitter<string>();

  constructor(private service: ServiceService,
    private fb: FormBuilder) {}

    formAccount = this.fb.group({
      id: [''],
    })

    ngOnInit(): void {
      this.getAccounts()
    }

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
