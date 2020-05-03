import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { selectCurrentJob, selectJobs } from 'src/app/selectors/timecard.selectors';
import { changeJob, addJob, deleteJob } from 'src/app/actions/timecard.actions';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobForm: FormGroup;
  jobs: Job[];
  currentJob$: Observable<string>;
  dataSource: MatTableDataSource<Job>;
  displayedColumns = ['select', 'name', 'rate', 'actions'];

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {
    this.jobForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'rate': ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  ngOnInit() {
    this.store.select(selectJobs).subscribe(jobs => {
      this.jobs = jobs;
      this.dataSource = new MatTableDataSource(jobs);
    });
    this.currentJob$ = this.store.select(selectCurrentJob);
  }

  changeJob({name}) {
    this.store.dispatch(changeJob({name}));
  }

  submit() {
    this.store.dispatch(addJob({job: this.jobForm.value}));
    this.jobForm.reset();
  }

  delete(job: Job) {
    this.store.dispatch(deleteJob({job}))
  }

}
