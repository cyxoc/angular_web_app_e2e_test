import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './job/job.component';
import { JobsService } from './jobs.service';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    JobComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [
    JobsService
  ],
  entryComponents: [
    AppComponent,
    JobsComponent,
    JobComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
