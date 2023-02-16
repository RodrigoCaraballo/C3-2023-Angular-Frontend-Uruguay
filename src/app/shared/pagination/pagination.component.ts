import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{

  constructor(private service: ServiceService) {}

  ngOnInit(): void {

  }

  // Get From Parent
  length!: number;

  // Send to Parent
  pageSize = 10;

}
