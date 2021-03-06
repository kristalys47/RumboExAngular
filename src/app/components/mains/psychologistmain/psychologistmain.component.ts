import { Component, OnInit } from '@angular/core';
//import {StudentService} from "../../../services/student.service";
import { Store } from '@ngrx/store';
import {Student} from '../../../models/student';
import { Observable } from 'rxjs/Observable';
import * as fromStoreReducers from '../../../store/reducers';

@Component({
  selector: 'app-psychologistmain',
  templateUrl: './psychologistmain.component.html',
  styleUrls: ['./psychologistmain.component.css']
})
export class PsychologistmainComponent implements OnInit {
  students$: Observable<Student[]>;     //THe list of students
  constructor(private store: Store<fromStoreReducers.State> ) { }


  ngOnInit() {
    //console.log(state);
    //let curr_user_id = sessionStorage.getItem('userid');
    this.students$ = this.store.select(fromStoreReducers.getALlStudents);
  }

}
