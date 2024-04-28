import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-jobs',
  template: `
    <h1>Browse Jobs</h1>
    <h2>Technology</h2>
    <ul>
      <li *ngFor="let job of jobs">
        <a [routerLink]="['/job', job.id]">
          <span class="title">{{job.title}}</span>
          <span class="location">Location: {{job.location}}</span>
          <span class="date">Date posted: {{job.date}}</span>
        </a>
      </li>
    </ul>
  `,
  styles: [
    `h1 {
      font-size: 30px;
      font-weight: 900;
      text-align: center;
      text-transform: uppercase;
    }`,
    `h2 {
      border-bottom: 1px solid #a6a6a6;
      padding-bottom: 10px;
      font-size: 24px;
      margin-bottom: 0;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -1px;
    }`,
    `a {
      display: block;
      display: flex;
      align-items: center;
      flex-grow: 1;
      text-decoration: none;
      color: inherit;
    }`,
    `li {
      padding: 10px 5px;
      border-bottom: 1px solid #a6a6a6;
      display: flex;
    }`,
    `.title {
      font-size: 18px;
      line-height: 20px;
      vertical-align: baseline;
    }`,
    `.location {
      margin-left: auto;
      font-size: 14px;
      line-height: 16px;
      color: #8b939b;
      margin-right: 30px;
      width: 200px;
      vertical-align: baseline;
    }`,
    `.date {
      font-size: 14px;
      line-height: 16px;
      color: #8b939b;
      vertical-align: baseline;
    }`
  ]
})
export class JobsComponent implements OnInit {
  jobs;
  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    this.jobsService.getJobs()
          .subscribe(jobs => this.jobs = jobs);

  }

}
