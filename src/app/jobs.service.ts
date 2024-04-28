import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';

const jobs = [
  {
    title: 'Sr. Software Developer',
    location: 'Gurgaon, India',
    date: '2020-07-20',
    id: 1
  },
  {
    title: 'Sr. Software Developer',
    location: 'London, UK',
    date: '2020-07-20',
    id: 2
  },
  {
    title: 'Testing Engineer',
    location: 'Gurgaon, India',
    date: '2020-07-20',
    id: 3
  },
  {
    title: 'Testing Engineer',
    location: 'London, UK',
    date: '2020-07-20',
    id: 4
  },
  {
    title: 'Sr. Web Designer',
    location: 'London, UK',
    date: '2020-07-20',
    id: 5
  },
  {
    title: 'Sr. Web Designer',
    location: 'Gurgaon, India',
    date: '2020-07-20',
    id: 6
  }
];

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  getJobs() {
    return of(jobs);
  }

  getJob(jobId) {
    return of(jobs.find(({id}) => id===jobId));
  }

  applyToJob(id) {
    if (id===5) {
      return of({success: false});
    }
    return of({success: true});
  }

  constructor() { }
}
