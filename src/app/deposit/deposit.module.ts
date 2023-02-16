import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDepositFormComponent, DepositHistoryComponent } from './';
import { MainDepositComponent } from './main-deposit/main-deposit.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DepositInfoComponent } from './deposit-info/deposit-info.component';
import { DepositRoutingModule } from './deposit-routing.module';
import { MatDateRangeInput, MatDatepickerModule, MatDateRangePicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    CreateDepositFormComponent,
    DepositHistoryComponent,
    MainDepositComponent,
    DepositInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  exports: [CreateDepositFormComponent,
    DepositHistoryComponent,
  DepositInfoComponent]
})
export class DepositModule { }
