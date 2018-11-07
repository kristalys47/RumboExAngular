import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-psychologistmain',
  templateUrl: './psychologistmain.component.html',
  styleUrls: ['./psychologistmain.component.css']
})
export class PsychologistmainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let curr_user_id = sessionStorage.getItem('userid');

  }

}
