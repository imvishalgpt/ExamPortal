import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

export interface Category {
  cid?: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) {}

  public categories(): Observable<Category[]> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this._http.get<Category[]>(`${baseUrl}/category/`, { headers });
  }

  //add new category
  public addCategory(category: Category)
  {
     return this._http.post<Category>(`${baseUrl}/category/`, category);
  }
  deleteCategory(cid: any) {
  return this._http.delete(`${baseUrl}/category/${cid}`);
}
}