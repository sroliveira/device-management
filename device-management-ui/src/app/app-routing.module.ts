import { CategoryCreateComponent } from './categories/category-create/category-create.component';
import { CategoryListComponent } from './categories/category-list/category-list.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeviceListComponent } from './devices/device-list/device-list.component';
import { DeviceCreateComponent } from './devices/device-create/device-create.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'createCategory', component: CategoryCreateComponent },
  { path: 'devices', component: DeviceListComponent },
  { path: 'createDevice', component: DeviceCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
