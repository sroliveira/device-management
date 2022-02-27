import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Device } from './../device.model';
import { Component, EventEmitter, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { DeviceService } from '../device.service';
import { DeviceCreateComponent } from '../device-create/device-create.component';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { DeviceDTO } from 'src/app/devices/device.dto';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  buttonSearchClicked = new EventEmitter();

  Device : Device[] = [];

  public columns = ['#', 'category', 'color', 'partnumber', 'action'];

  public dataSource = new MatTableDataSource<DeviceDTO>();

  categoryIdSearch : number = null;

  categories : Category[] = [];

  constructor(public deviceService : DeviceService, public categoryService : CategoryService, public dialog : MatDialog) {

  }
  ngOnInit(): void {
    this.categories = this.categoryService.getCategories('');
  }

  onAddDevice(): void {
    const dialogRef = this.dialog.open(DeviceCreateComponent, {
      width: '300px',
      height: '400px'
    });

    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onSearchDevice() {
    this.dataSource.data = this.deviceService.getDevices(this.categoryIdSearch);
    this.categories = this.categoryService.getCategories('');
  }

  onClearDevice() {
    this.categoryIdSearch = null;
  }

  onRemoveDevice(id: number) {
    this.deviceService.deleteDevice(id);
    this.onSearchDevice();
  }

}
