import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../services/student/student.service";

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

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudent(0).subscribe(data => {
      this.user = data;
    })
  }

}
