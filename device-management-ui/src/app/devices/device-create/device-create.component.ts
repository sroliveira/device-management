import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent implements OnInit {

  categoryId : number = null;
  colorDevice = '';
  partnumberDevice : number = null;
  categories : Category[] = [];

  constructor(
    public dialogRef: MatDialogRef<DeviceCreateComponent>, public deviceService : DeviceService, public categoryService : CategoryService
  ) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories('');
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveDevice(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    try {
      this.categoryId = form.value.categoryId;
      this.colorDevice = form.value.colorDevice;
      this.partnumberDevice = form.value.partnumberDevice;
      this.deviceService.saveDevice(this.categoryId, this.colorDevice.toUpperCase(), this.partnumberDevice);
      this.dialogRef.close();
      alert('Device added successfully');
    } catch (error) {
      console.log('Log error', error);
      window.alert('The field')
    }
  }

  keyPressOnlyNumber(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    var keyPressed = (event.which) ? event.which : event.keyCode;
    if ((keyPressed < 48) || (keyPressed > 57)) {
      event.preventDefault();
      this.partnumberDevice = null;
      return false;
    } else {
      return true;
    }
  }

  keyPressOnlyText(event: { keyCode: number; preventDefault: () => void; }) {
    var keyPressed = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(keyPressed)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

}
