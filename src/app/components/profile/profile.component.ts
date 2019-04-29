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

  save(email,username,name,lastname,studentnum,phonenum) {
    // todo: still not implemented in backend
    // if(this.user.email!=email) {
    //   this.studentService.updateStudent(this.userid, {'email': email});
    // }
    // if(this.user.username!=username) {
    //
    // }
    // if(this.user.name!=name) {
    //
    // }
    // if(this.user.lastname!=lastname) {
    //
    // }
    if(this.user.studentnum!=studentnum && studentnum.length==9) {
      this.studentService.updateStudent(this.userid,{'student_num': studentnum});
      this.user.student_num = studentnum;
    }
    if(this.user.phonenum!=phonenum && phonenum.length==10) {
      this.studentService.updateStudent(this.userid,{'phone_num': phonenum});
      this.user.phone_num = phonenum;
    }
    this.toggleEdit();
  }
}
