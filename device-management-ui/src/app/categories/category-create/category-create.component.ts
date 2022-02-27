import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  categoryName = '';

  constructor(
    public dialogRef: MatDialogRef<CategoryCreateComponent>, public categoryService : CategoryService
  ) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveCategory(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    alert('Category added successfully!');
    this.categoryName = form.value.categoryName;
    this.categoryService.saveCategory(this.categoryName.toUpperCase());
    this.dialogRef.close();
  }

}
