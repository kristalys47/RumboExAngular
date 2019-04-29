import {Component, OnInit} from '@angular/core';
import {StudentProvider} from "../../providers/student-provider";
import {StudentService} from "../../services/student/student.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userid = sessionStorage.getItem('userid');
  user;
  student: any;
  courses: any;
  tasks: any;

  edit: boolean = false;

  constructor(private data: StudentProvider, private studentService: StudentService) { }

  ngOnInit() {

    // this.user = this.data.student;
    this.studentService.getStudent(this.userid).subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  save() {
    this.toggleEdit();
  }
}
