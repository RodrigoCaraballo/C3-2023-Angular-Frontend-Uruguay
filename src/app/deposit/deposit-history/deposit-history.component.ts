import { Component, OnInit } from '@angular/core';
import { DepositModel } from '../../interfaces/deposit.model';
import { ServiceService } from '../../service/service.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { start } from 'repl';
import { PaginationAndDataRange } from '../../interfaces/pagination.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-deposit-history',
  templateUrl: './deposit-history.component.html',
  styleUrls: ['./deposit-history.component.scss']
})
export class DepositHistoryComponent{

  deposits!: DepositModel[];
  showComponent = false;

  offset = 0;
  limit = 10;

  selectedId!: string

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(private service: ServiceService,
    private router: Router,
    private fb: FormBuilder) {}


  getHistory($event: string) {
    this.showComponent = true;
    this.selectedId = $event;

    if(this.selectedId != '' && this.selectedId != 'Select an Account') {
      this.service.getDepositHistory(this.selectedId, {startItem: this.offset, limitItem: this.limit, dateStart: this.range.controls.start.value || 0, dateEnd: this.range.controls.end.value || Date.now()})
      .subscribe(history => this.deposits = history);
    }
  }

  onDateChange() {
    if(this.range.controls.start.valid && this.range.controls.end.valid && this.range.controls.start.value && this.range.controls.end.value) {
      this.getHistory(this.selectedId);
    }
  }

  removeFilter() {
    this.range.reset();

    this.getHistory(this.selectedId);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;

    this.offset = startIndex;

    this.getHistory(this.selectedId)
  }
}
