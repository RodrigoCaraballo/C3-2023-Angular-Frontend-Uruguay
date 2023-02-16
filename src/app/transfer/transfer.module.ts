import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTransferFormComponent, TransferHistoryComponent, TransferInfoComponent } from './';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TransferRoutingModule } from './transfer-routing.module';
import { MaterialModule } from '../material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [CreateTransferFormComponent, TransferHistoryComponent, TransferInfoComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, MatNativeDateModule, MatDatepickerModule],
  exports: [CreateTransferFormComponent, TransferHistoryComponent, TransferInfoComponent]
})
export class TransferModule {}
