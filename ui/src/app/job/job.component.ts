import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EngineerService } from '../services/engineer.service';
import { JobService } from '../services/job.service';
import { JobModel } from '../models/job.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, OnDestroy {

  public engineers: string[] = [];

  public jobs: JobModel[] = [];

  public newJob: JobModel = {
    jobId: null,
    engineer: null,
    when: null
  };

  private subs: Subscription;

  constructor(
    private engineerService: EngineerService,
    private jobService: JobService) { }

  ngOnInit() {
    this.subs = this.engineerService.GetEngineers().subscribe(engineers => this.engineers = engineers);
    this.subs.add(this.jobService.GetJobs().subscribe(jobs => this.jobs = jobs));
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
        this.jobService.GetJobs().subscribe(jobs => this.jobs = jobs);
      });
    }
  }

}
