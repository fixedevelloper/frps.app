import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {map} from "rxjs/operators";
import {Category, Product} from "../models/product.model";
import {environment} from "../../../environments/environment";
import { Observable } from 'rxjs';
import {ApiResponse} from "../helper/api-response";
import {OrderModel} from "../models/litiges.model";
import {City, Departement} from "../models/departement.model";
import {UserModels} from "../models/user.models";


@Injectable({ providedIn: 'root' })
export class ApiService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  addUser(user: UserModels): Observable<UserModels> {
    return this.http.post<UserModels>(`${this.apiUrl}/api/register`, user);
  }
  getDepartements(): Observable<Departement[]> {
    return this.http.get<ApiResponse<Departement[]>>(`${this.apiUrl}/api/departements`).pipe(
      map(response => response.data)
    );
  }
  getCityByDepartementID(id: number): Observable<City[]> {

    return this.http.get<ApiResponse<City[]>>(`${this.apiUrl}/api/cities/${id}`).pipe(
      map(response => response.data)
    );
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/api/categories`).pipe(
      map(response => response.data)
    );
  }

  getProducts(page: number = 1, perPage: number = 10, category: string = '') {
    let url = `${this.apiUrl}/api/products?page=${page}&per_page=${perPage}`;
    if (category) url += `&category=${category}`;
    return this.http.get<any>(url);
  }
  getLitiges(page: number = 1, perPage: number = 10, category: string = '') {
    let url = `${this.apiUrl}/api/litiges/customer?page=${page}&per_page=${perPage}`;
    return this.http.get<any>(url);
  }
  getRetourProducts(page: number = 1, perPage: number = 10, category: string = '') {
    let url = `${this.apiUrl}/api/returns/customer?page=${page}&per_page=${perPage}`;
    return this.http.get<any>(url);
  }
  getOrders(page: number = 1, perPage: number = 10, category: string = '') {
    let url = `${this.apiUrl}/api/orders/customer?page=${page}&per_page=${perPage}`;
    return this.http.get<any>(url);
  }
  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/orders/${id}`);
  }
  saveOrder(formValue: any): Observable<OrderModel>  {
    return this.http.post<OrderModel>(`${this.apiUrl}/api/orders`, formValue);
  }
  deleteAgent(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/categories/${id}`);
  }

  getOrderDetail(orderId: string): Observable<any>  {
    return this.http.get<any>(`${this.apiUrl}/api/orders/${orderId}`);
  }

  submitReturnRequest(payload: any): Observable<any>  {

    return this.http.post(`${this.apiUrl}/api/returns`, payload);

  }
  submitLitige(payload: any): Observable<any>  {

    return this.http.post(`${this.apiUrl}/api/litiges`, payload);

  }

  makePayment(formValue: any): Observable<any>  {
    return this.http.post(`${this.apiUrl}/api/paiements`, formValue);
  }
}
