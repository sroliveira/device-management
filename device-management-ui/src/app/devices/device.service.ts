import { APP_ID, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Device } from "./device.model";
import { Observable, Subject } from "rxjs";
import { Category } from "../categories/category.model";
import { DeviceDTO } from "./device.dto";

@Injectable({providedIn: 'root'})
export class DeviceService {

  private devices: DeviceDTO[] = [];
  private devicesUpdated = new Subject<Device[]>();

  constructor(private httpClient : HttpClient) {

  }

  saveDevice(categoryId : number, colorDevice: string, partnumberDevice: number) {
    const category : Category = {id: categoryId, name: null};
    const device : Device = { id: null, color : colorDevice, partnumber: partnumberDevice, category : category };
    this.httpClient.post<{ message: string }>('http://localhost:3000/api/device', device).subscribe((responseData) => {
      console.log(responseData.message);
    })
  }

  getDevices(categoryId : number) {
    let params = new HttpParams().set('categoryId',categoryId);
    this.httpClient.get<{message: string, devices: DeviceDTO[]}>('http://localhost:3000/api/devices', { params : params }).toPromise().then(async (res : any) => {
      this.devices = await res.devices;
      console.log(res);
    });
    return this.devices;
  }

  deleteDevice(id : number) {
    let params = new HttpParams().set('deviceId',id);
    this.httpClient.delete<{message: string}>('http://localhost:3000/api/device', { params : params }).subscribe((categoryData) => {});
  }

}
