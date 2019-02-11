import { Component, OnInit } from '@angular/core';
//import {StudentService} from "../../../services/student.service";
import {Student} from '../../../models/student';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-psychologistmain',
  templateUrl: './psychologistmain.component.html',
  styleUrls: ['./psychologistmain.component.css']
})
export class PsychologistmainComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    //let curr_user_id = sessionStorage.getItem('userid');
    // this.store.select('psychologist').subscribe(state =>{
    //   console.log(state);
    // });
  }

}
