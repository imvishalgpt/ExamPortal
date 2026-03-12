import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  // get JWT token from localStorage
  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  // add user (no token needed — public endpoint)
  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }

  // get all students — sends JWT token
  public getAllUsers() {
    return this.http.get(`${baseUrl}/user/all`, { headers: this.getHeaders() });
  }

  // delete user by id — sends JWT token
  public deleteUser(id: any) {
    return this.http.delete(`${baseUrl}/user/${id}`, { headers: this.getHeaders() });
  }
}