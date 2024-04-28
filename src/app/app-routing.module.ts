import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './job/job.component';

const routes: Routes = [
  { path: 'jobs', component: JobsComponent },
  { path: 'job/:jobId', component: JobComponent },
  { path: '',   redirectTo: '/jobs', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: JobsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
