import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Finance } from '../../../assets/models/finance';
import { FinancesService } from '../../../assets/services/financesService';


@Component({
  selector: 'app-form-finance',
  standalone: true,
  imports: [FormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './form-finance.component.html',
  styleUrl: './form-finance.component.scss'
})
export class FormFinanceComponent implements OnInit {
  myForm = new FormGroup({
    // id: new FormControl(),
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    value: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    // updated: new FormControl(Date, [Validators.required])
  });

  financeService = inject(FinancesService);

  constructor(
    public dialogRef: MatDialogRef<FormFinanceComponent>,
    @Inject(MAT_DIALOG_DATA) public element: Finance | null,
  ) { }

  ngOnInit(): void {
    if (this.element != null) {
      const tmp = {
        name: this.element.name,
        value: this.element.value,
        category: this.element.category
      }
      this.myForm.setValue(tmp);
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  save() {
    const id = this.element?.id ? this.element.id : null;

    const finance: Finance = {
      id: this.element?.id ? this.element.id : null,
      value: this.myForm.value?.value ? this.myForm.value.value : "",
      name: this.myForm.value?.name ? this.myForm.value?.name : "",
      category: this.myForm.value?.category ? this.myForm.value.category : "",
      updated: new Date(),
    }

    if (id != null) {
      this.financeService.updateFinance(id + '', finance)
    } else {
      this.financeService.addFinance(finance);
    }
    this.dialogRef.close(true);
  }
}
