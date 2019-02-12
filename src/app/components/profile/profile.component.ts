import {Component, OnInit} from '@angular/core';
import {StudentProvider} from "../../providers/student-provider";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // user = sessionStorage.getItem('token');
  user;
  student: any;
  courses: any;
  tasks: any;

  constructor(private data: StudentProvider) { }

  ngOnInit() {

    this.user = this.data.student;

  }
}
