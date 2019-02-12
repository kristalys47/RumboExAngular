import { Component, OnInit } from '@angular/core';
import {StudentProvider} from "../../../providers/student-provider";

@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {

  role = sessionStorage.getItem('role');
  mainpath = '/'+this.role+'main'
  // user = sessionStorage.getItem('token');
  user;

  constructor(private data: StudentProvider) { }

  ngOnInit() {

    this.user = this.data.student;
  }

}
