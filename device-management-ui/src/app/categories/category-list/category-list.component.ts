import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Category } from './../category.model';
import { Component, EventEmitter, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../category.service';
import { CategoryCreateComponent } from '../category-create/category-create.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  buttonSearchClicked = new EventEmitter();

  Category : Category[] = [];

  public columns = ['#', 'name', 'action'];

  public dataSource = new MatTableDataSource<Category>();

  nameSearch = '';

  constructor(public categoryService : CategoryService, public dialog : MatDialog) {

  }
  ngOnInit(): void {
    this.onSearchCategory();
  }

  onAddCategory(): void {
    const dialogRef = this.dialog.open(CategoryCreateComponent, {
      width: '300px'
    });

    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSearchCategory() {
    if (this.nameSearch != null) {
      this.nameSearch = this.nameSearch.toUpperCase();
    }
    this.dataSource.data = this.categoryService.getCategories(this.nameSearch);
  }

  onClearCategory() {
    this.nameSearch = '';
  }

  onRemoveCategory(id: number) {
    try {
      this.categoryService.deleteCategory(id);
      alert('Category removed successfully');
      this.onSearchCategory();
    } catch(error) {
      console.log(error);
    }

  }

}
