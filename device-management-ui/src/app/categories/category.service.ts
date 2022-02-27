import { APP_ID, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Category } from "./category.model";
import { Observable, Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class CategoryService {

  private categories: Category[] = [];
  private categoriesUpdated = new Subject<Category[]>();

  constructor(private httpClient : HttpClient) {

  }

  saveCategory(nameCategory : string) {
    const category : Category = { id: null, name : nameCategory };
    this.httpClient.post<{ message: string }>('http://localhost:3000/api/category', category).subscribe((responseData) => {
      console.log(responseData.message);
    })
  }

/**  getCategories(nameCategory : string) {
    let params = new HttpParams().set('nameCategory',nameCategory);
    console.log(nameCategory);
    this.httpClient.get<{message: string, categories: Category[]}>('http://localhost:3000/api/categories', { params : params }).subscribe((categoryData) => {
      this.categories = categoryData.categories;
      console.log(categoryData);
      //Notifica sobre a atualização de categorias
      this.categoriesUpdated.next([...this.categories]);
    });
    console.log(this.categories);
    return this.categories;
  }*/

  getCategories(nameCategory : string) {
    let params = new HttpParams().set('nameCategory',nameCategory);
    this.httpClient.get<{message: string, categories: Category[]}>('http://localhost:3000/api/categories', { params : params }).toPromise().then(async (res : any) => {
      this.categories = await res.categories;
      console.log(res);
    });
    return this.categories;
  }

  deleteCategory(id : number) {
    let params = new HttpParams().set('categoryId',id);
    this.httpClient.delete<{message: string}>('http://localhost:3000/api/category', { params : params }).subscribe((categoryData) => {});
  }

}
