import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateTransferFormComponent } from './create-transfer-form/create-transfer-form.component';
import { TransferHistoryComponent } from './transfer-history/transfer-history.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'history', title: 'Deposit', component: TransferHistoryComponent},
      {path: 'new-transfer', title: 'New Transfer', component: CreateTransferFormComponent},
      {path: '**', redirectTo: 'history'}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
    ]
})
export class TransferRoutingModule { }
