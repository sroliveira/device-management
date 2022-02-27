import { APP_ID, Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Category } from "./category.model";
import { Observable, Subject } from "rxjs";
import { environment } from "../../environments/environment";

const URL_API = environment.urlApi;

@Injectable({providedIn: 'root'})
export class CategoryService {

  private categories: Category[] = [];
  private categoriesUpdated = new Subject<Category[]>();

  constructor(private httpClient : HttpClient) {

  }

  saveCategory(nameCategory : string) {
    try {
      const category : Category = { id: null, name : nameCategory };
      this.httpClient.post<{ message: string }>(URL_API + '/category', category).subscribe((responseData) => {
        console.log(responseData.message);
      })
    } catch(error) {
      console.log(error);
    }

  }

  getCategories(nameCategory : string) {
    let params = new HttpParams().set('nameCategory',nameCategory);
    console.log(nameCategory);
    this.httpClient.get<{message: string, categories: Category[]}>(URL_API+'/categories', { params : params }).subscribe((categoryData) => {
      this.categories = categoryData.categories;
      console.log(categoryData);
      //Notifica sobre a atualização de categorias
      this.categoriesUpdated.next([...this.categories]);
    });
    console.log(this.categories);
    return this.categories;
  }

  /*getCategories(nameCategory : string) {
    try {
      let params = new HttpParams().set('nameCategory',nameCategory);
      this.httpClient.get<{message: string, categories: Category[]}>(URL_API + '/categories', { params : params }).toPromise().then(async (res : any) => {
        this.categories = await res.categories;
      });
      return this.categories;
    } catch(error) {
      console.log(error);
      return this.categories;
    }

  }*/

  deleteCategory(id : number) {
    try {
      let params = new HttpParams().set('categoryId',id);
      this.httpClient.delete<{message: string}>(URL_API + '/category', { params : params }).subscribe((categoryData) => {});
    } catch(error) {
      console.log(error);
      throw error;
    }

  }

}
