import { CategoryListComponent } from './categories/category-list/category-list.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeviceListComponent } from './devices/device-list/device-list.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'devices', component: DeviceListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
