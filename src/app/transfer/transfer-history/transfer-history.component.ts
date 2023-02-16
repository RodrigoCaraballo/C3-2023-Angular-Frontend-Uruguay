import { Component } from '@angular/core';
import { TransferModel } from '../../interfaces/transfer.model';
import { ServiceService } from '../../service/service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.scss']
})
export class TransferHistoryComponent {

  isAll = true;
  isIncomes = false;
  isOutcomes = false;

  offset = 0;
  limit = 10;
  historyLength = 100;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  incomes!: TransferModel[];
  outcomes!: TransferModel[];
  history!: TransferModel[];

  selectedId!: string

  constructor(private service: ServiceService,
    private router: Router,
    private fb: FormBuilder) {}

  getTransferHistory($event: string) {
    this.selectedId = $event;

    this.service.getTransferHistory(this.selectedId, {startItem: this.offset, limitItem: this.limit, dateStart: this.range.controls.start.value || 0, dateEnd: this.range.controls.end.value || Date.now()})
    .subscribe(history => {
      this.history = history
      this.historyLength = history.length})
  }

  getIncomes($event: string) {
    this.service.getIncomes(this.selectedId, {startItem: this.offset, limitItem: this.limit, dateStart: this.range.controls.start.value || 0, dateEnd: this.range.controls.end.value || Date.now()})
    .subscribe(history => {
      this.incomes = history
      this.historyLength = history.length
    })
  }

  getOutcomes($event: string) {
    this.service.getOutcomes(this.selectedId, {startItem: this.offset, limitItem: this.limit, dateStart: this.range.controls.start.value || 0, dateEnd: this.range.controls.end.value || Date.now()})
    .subscribe(history => {
      this.outcomes = history
      this.historyLength = history.length
    })
  }

  activeHistory(type: string) {
    if(type === 'All') {
      this.isAll = true;
      this.isOutcomes = false;
      this.isIncomes = false;

      this.getTransferHistory(this.selectedId);
    }

    if(type === 'Incomes') {
      this.isAll = false;
      this.isOutcomes = false;
      this.isIncomes = true;

      this.getIncomes(this.selectedId);
    }

    if(type === 'Outcomes') {
      this.isAll = false;
      this.isOutcomes = true;
      this.isIncomes = false;

      this.getOutcomes(this.selectedId);
    }
  }

  onDateChange() {
    if(this.range.controls.start.valid && this.range.controls.end.valid && this.range.controls.start.value && this.range.controls.end.value) {
      if(this.isAll) this.getTransferHistory(this.selectedId)
      if(this.isIncomes) this.getIncomes(this.selectedId)
      if(this.isOutcomes) this.getOutcomes(this.selectedId)
    }
  }

  removeFilter() {
    this.range.reset();

    if(this.isAll) this.getTransferHistory(this.selectedId)
    if(this.isIncomes) this.getIncomes(this.selectedId)
    if(this.isOutcomes) this.getOutcomes(this.selectedId)
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;

    this.offset = startIndex;

    if(this.isAll) this.getTransferHistory(this.selectedId)
    if(this.isIncomes) this.getIncomes(this.selectedId)
    if(this.isOutcomes) this.getOutcomes(this.selectedId)
  }
}
