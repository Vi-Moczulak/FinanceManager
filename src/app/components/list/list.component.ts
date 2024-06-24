import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { DatePipe } from '@angular/common';
import { Finance } from '../../../assets/models/finance';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormFinanceComponent } from '../form-finance/form-finance.component';
import { FinancesService } from '../../../assets/services/financesService';

import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule, Sort } from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatIconModule, MatDividerModule, DatePipe, MatTable, MatTableModule, MatButtonModule, MatDialogModule, MatTooltipModule, ReactiveFormsModule, MatSortModule, MatToolbarModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Finance>;

  finances: Finance[] = [];
  sortedData: Finance[] = [];
  displayedColumns: string[] = ['name', 'value', 'category', 'updated', 'action'];


  financeService = inject(FinancesService);
  constructor(
    public dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.getFinances()
  }

  getFinances() {
    this.financeService.getFinance().subscribe((values) => {
      this.finances = values;
      this.sortedData = this.finances.slice();
    });
  }

  addEditElement(element: Finance | null) {
    const dialogRef = this.dialog.open(FormFinanceComponent, { data: element });
  }

  removeById(id: number) {
    this.financeService.removeFinance(id + '');
  }

  sortData(sort: Sort) {
    const data = this.finances.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'category':
          return this.compare(a.category, b.category, isAsc);
        case 'value':
          return (Number(a.value) && Number(b.value)) ? this.compare(Number(a.value), Number(b.value), isAsc) : this.compare(a.value, b.value, isAsc);
        case 'updated':
          return this.compare(a.updated, b.updated, isAsc);
        default:
          return 0;
      }
    });
  }


  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}


