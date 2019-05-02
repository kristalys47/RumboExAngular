import {Component, OnInit} from '@angular/core';
import {StudentProvider} from "../../providers/student-provider";
import {StudentService} from "../../services/student/student.service";
import {Student} from "../../models/student";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userid = sessionStorage.getItem('userid');
  user;
  student: Student = new Student();
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

  /*
  *   This function toggles the edit option between editable and non-editable
  * */
  toggleEdit() {
    this.edit = !this.edit;
  }

  /*
  *   After editing user information, if data was modified it will send request to backend to alter db
  * */
  save(email,username,name,lastname,studentnum,phonenum) {
    if(this.user.email!=email) {
      this.studentService.updateStudent(this.userid, {'email': email});
      this.user.email = email;
    }
    if(this.user.username!=username) {
      this.studentService.updateStudent(this.userid, {'username': username});
      this.user.username = username;
    }
    if(this.user.name!=name) {
      this.studentService.updateStudent(this.userid, {'name': name});
      this.user.name = name;
    }
    if(this.user.lastname!=lastname) {
      this.studentService.updateStudent(this.userid, {'lastname': lastname});
      this.user.lastname = lastname;
    }
    if(this.user.studentnum!=studentnum && studentnum.length==9) {
      this.studentService.updateStudent(this.userid,{'student_num': studentnum});
      this.user.student_num = studentnum;
    }
    if(this.user.phonenum!=phonenum && phonenum.length==10) {
      this.studentService.updateStudent(this.userid,{'phone_num': phonenum});
      this.user.phone_num = phonenum;
    }
    // Once the information is changed, change view to non-editable
    this.toggleEdit();
  }
}
