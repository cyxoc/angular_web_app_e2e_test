import { Component, OnInit, ViewChild } from '@angular/core';
import { JobsService } from '../jobs.service';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-job',
  template: `
  <h1>{{job.title}}</h1>
  <p>{{job.location}}</p>
  <button (click)="openForm()">APPLY NOW</button>
  <h2>DETAILED ROLE DESCRIPTION:</h2>
    <ul class="list-1">
        <li>Design, development and testing of new features in the applications using C#.</li>
        <li>Responsible for regular communication with others involved in the development process.</li>
        <li>Implement, test, and bug-fix functionality.</li>
        <li>Participate as a team member in our agile development process (team meetings, code reviews. </li>
        <li>Provide support to end users.</li>
    </ul>
    <h2>DESIRED SKILLS:</h2>
    <ul class="list-1">
        <li>5+ years of software development experience in C#.</li>
        <li>.Net Core 2.2 or higher experience.</li>
        <li>Solid knowledge and experience in SQL, EF, ADO.NET, Stored procedures, queryoptimisation.</li>
        <li>Good knowledge of NoSQL technology (MongoDB). </li>
        <li>WEB API (REST, GraphQL). </li>
        <li>BS degree in Computer Science or Engineering. </li>
        <li>Experience developing data intense applications and/or ETL processes. </li>
        <li>Strong in Object Oriented Programming, Design patterns and SOLID principles. </li>
    </ul>
    <h2>WHY YOU DO NOT WANT TO MISS THIS CAREER OPPORTUNITY?</h2>
    <ul class="list-1">
        <li>Work for a Company that will revolutionise the Risk industry.</li>
        <li>Work closely with senior leaders who have individually served a number of CEOs at Fortune 100 companies globally.</li>
        <li>Capitalise on an unparalleled career progression opportunity.</li>
        <li>Build technical development skills in an industry with a significant growth potential (both in India and globally).</li>
        <li>Learn structured problem-solving and pyramid-based communication skills. </li>
    </ul>
    
    <div *ngIf="formOpen" class="form-container" (click)="close()">
      <div class="success" *ngIf="submitSuccess">Application submitted</div>
      <div class="error" *ngIf="submitError">There was an error submitting the application</div>
      <form *ngIf="!submitError && !submitSuccess" name="form" class="applyNowForm" method="post" (ngSubmit)="submitForm($event, form)" #form="ngForm" (click)="stop($event)">
          <div class="form-row">
            <div class="form-group">
                <label>Name*</label>
                <input type="text" class="form-control" name="name" required minlength="2" ngModel placeholder="Name" #name="ngModel">
                <div *ngIf="name.invalid && (name.dirty || name.touched)" class="error-msz">
                  <div *ngIf="name.errors.required">
                    Name is required.
                  </div>
                  <div *ngIf="name.errors.minlength">
                    Name must be at least 2 characters long.
                  </div>
                </div>
            </div>
            <div class="form-group">
              <label>Email*</label>
              <input type="email" name="email" class="form-control" ngModel placeholder="Please enter your email" required #email="ngModel">
              <div *ngIf="email.invalid && (email.dirty || email.touched)" class="error-msz">
                <div *ngIf="email.errors.required">
                  Email is required.
                </div>
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Attach Resume</label>
              <input type="file" name="resume" ngModel class="form-control-file" accept=".pdf, .doc, .docx" required #resume="ngModel">
              <div *ngIf="resume.invalid && (resume.dirty || resume.touched)" class="error-msz">
                  <div *ngIf="resume.errors.required">
                    Resume is required.
                  </div>
                </div>
            </div>
          </div>
        <div class="d-flex">
            <div class="ml-auto">
                <button type="submit">Apply Now</button>
            </div>
        </div>
      </form>
    </div>
    `,
  styles: [
    'ul {padding-left: 25px; list-style-type: disc;}',
    'li {margin-bottom: 5px;}',
    'h2 {margin: 30px 0 15px; font-size: 24px}',
    `h1 {
      padding-bottom: 5px;
      margin-bottom: 20px;
      border-bottom: 1px dashed #666666;
      font-size: 25px;
      padding-bottom: 0px;
      font-weight: normal;
      text-transform: uppercase;
      letter-spacing: normal;
    }`,
    `button {
      background: #333;
      color: #fff;
      border-color: #333;
      padding: 11px 24px;
      border-radius: 20px;
      border-width: 3px;
      border-style: solid;
      display: inline-block;
      font-size: 11px;
      font-family: Arial, sans-serif;
      font-weight: 900;
      text-transform: uppercase;
      transition: all 0.3s;
      margin-top: 20px;
    }`,
    `.form-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
    }`,
    `form,
    .success,
    .error {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      width: 600px;
      margin: 0 auto;
      background-color: #f2f2f2;
      padding: 20px;
    }`,
    `.form-row {
      display: flex;
      flex-wrap: wrap;
      margin-right: -5px;
      margin-left: -5px;
      vertical-align: baseline;
    }`,
    `.form-group {
      padding-right: 5px;
      padding-left: 5px;
      margin-bottom: 0.2rem;
      flex: 0 0 45%;
      max-width: 45%;
    }`,
    `label {
      padding-bottom: 10px;
      font-size: 16px;
      display: inline-block;
    }`,
    `input {
      display: block;
      width: 245px;
      padding: .375rem .75rem;
      font-size: 1rem;
      line-height: 1.5;
      color: #495057;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #ced4da;
      border-radius: .25rem;
      transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }`,
    `.error-msz {
      color: #cb212a;
      font-size: 12px;
      display: inline-block;
      padding-top: 5px;
    }`,
    `.error {
      color: #cb212a;
    }`
  ]
})
export class JobComponent implements OnInit {
  public job;
  public formOpen = false;
  @ViewChild('form', {static: false}) form: NgForm;
  @ViewChild('name', {static: false}) name: NgModel;
  @ViewChild('email', {static: false}) email: NgModel;
  @ViewChild('resume', {static: false}) resume: NgModel;
  formData: any = {};
  submitError= false;
  submitSuccess = false;

  public openForm() {
    this.formOpen = true;
  }

  public stop(event) {
    event.stopPropagation();
  }

  public close() {
    this.formOpen = false;
    this.submitError = false;
    this.submitSuccess = false;
  }

  public submitForm(event, {form}) {
    event.preventDefault();
    if (form.valid) {
      this.jobsService.applyToJob(this.job.id).subscribe(({success})=> {
        if (success) {
          this.submitSuccess = true;
          this.submitError = undefined;
        } else {
          this.submitSuccess = false;
          this.submitError = true;
        }
      });
    } else {
      form.touched = true;
      form.controls.name.touched = true;
      form.controls.email.touched = true;
      form.controls.resume.touched = true;
    }
  }

  constructor(private jobsService: JobsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.jobsService.getJob(+params.jobId))
    )
      .subscribe(job => this.job = job);
  }

}
