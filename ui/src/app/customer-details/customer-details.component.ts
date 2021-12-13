import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {

  private customerId: number;

  public customer: CustomerModel;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService) {
      this.customerId = route.snapshot.params.id;
    }

  ngOnInit() {
    this.sub = this.customerService.getCustomer(this.customerId).subscribe(customer => this.customer = customer);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
