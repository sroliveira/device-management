import { APP_ID, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Device } from "./device.model";
import { Observable, Subject } from "rxjs";
import { Category } from "../categories/category.model";
import { DeviceDTO } from "./device.dto";
import { environment } from "../../environments/environment";

const URL_API = environment.urlApi;

@Injectable({providedIn: 'root'})
export class DeviceService {

  private devices: DeviceDTO[] = [];
  private devicesUpdated = new Subject<Device[]>();

  constructor(private httpClient : HttpClient) {

  }

  saveDevice(categoryId : number, colorDevice: string, partnumberDevice: number) {
    try {
      const category : Category = {id: categoryId, name: null};
      const device : Device = { id: null, color : colorDevice, partnumber: partnumberDevice, category : category };
      this.httpClient.post<{ message: string }>(URL_API + '/device', device).subscribe((responseData) => {
        console.log(responseData.message);
      })
    } catch(error) {
      console.log(error);
    }
  }

  getDevices(categoryId : number) {
    try {
      let params = new HttpParams().set('categoryId',categoryId);
      this.httpClient.get<{message: string, devices: DeviceDTO[]}>(URL_API + '/devices', { params : params }).toPromise().then(async (res : any) => {
        this.devices = await res.devices;
        console.log(res);
      });
      return this.devices;
  } catch(error) {
    return this.devices;
    console.log(error);
  }
  }

  deleteDevice(id : number) {
    try {
      let params = new HttpParams().set('deviceId',id);
      this.httpClient.delete<{message: string}>(URL_API + '/device', { params : params }).subscribe((categoryData) => {});
    } catch(error) {
      console.log(error);
    }

  }

}
