import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {}

  public getCustomers(): Observable<CustomerModel[]> {
    return this.httpClient.get<CustomerModel[]>('http://localhost:63235/customers');
  }

  public createCustomer(customer: CustomerModel): Promise<object> {
    return this.httpClient.post('http://localhost:63235/customers', customer).toPromise();
  }

  public getCustomer(id: number): Observable<CustomerModel> {
    return this.httpClient.get<CustomerModel>(`http://localhost:63235/customers/${id}`);
  }
}
