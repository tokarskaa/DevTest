import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerType } from '../models/customer-type';
import { CustomerModel } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  public customers: CustomerModel[] = [];
  public customers$: Observable<CustomerModel[]>;
  public types = Object.values(CustomerType);

  public newCustomer: CustomerModel = {
    id: null,
    name: null,
    type: null
  };

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customers$ = this.customerService.getCustomers();
  }

  createCustomer(form: NgForm) {
    if (form.invalid) {
      alert('form is not valid');
    } else {
      this.customerService.createCustomer(this.newCustomer).then(() => {
        this.customers$ = this.customerService.getCustomers();
        this.newCustomer = {
          id: null,
          name: null,
          type: null
        };
      });
    }
  }

}
