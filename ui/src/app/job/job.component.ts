import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EngineerService } from '../services/engineer.service';
import { JobService } from '../services/job.service';
import { CreateJobModel } from '../models/create-job.model';
import { Subscription } from 'rxjs';
import { CustomerModel } from '../models/customer.model';
import { CustomerService } from '../services/customer.service';
import { JobModel } from '../models/job.model';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {

  public engineers: string[] = [];
  public customers: CustomerModel[] = [];

  public jobs: JobModel[] = [];

  public newJob: CreateJobModel = {
    engineer: null,
    when: null,
    customerId: null
  };

  private subs: Subscription = new Subscription();

  constructor(
    private engineerService: EngineerService,
    private jobService: JobService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.subs.add(this.engineerService.GetEngineers().subscribe(engineers => this.engineers = engineers));
    this.subs.add(this.jobService.GetJobs().subscribe(jobs => this.jobs = jobs));
    this.subs.add(this.customerService.getCustomers().subscribe(customers => this.customers = customers));
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  public createJob(form: NgForm): void {
    if (form.invalid) {
      alert('form is not valid');
    } else {
      this.jobService.CreateJob(this.newJob).then(() => {
        this.newJob = {
          engineer: null,
          when: null,
          customerId: null
        };
        this.jobService.GetJobs().subscribe(jobs => this.jobs = jobs);
      });
    }
  }
}
