import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {Student} from "../../../models/student";
import {ErroralertService} from "../../../services/erroralert.service";
import {StudentService} from "../../../services/student/student.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Student = new Student();
  passwordAgain;
  faculty;
  programs;

  constructor(private auth: AuthService, private router: Router, private error: ErroralertService, private studentService: StudentService) { }

  ngOnInit() {
    this.error.hidemessage();
    this.studentService.getFaculties().subscribe(data => {
      this.faculty = data.Faculties;
    })
  }

  /*
  *   Register student
  * */
  registration(): void {
    // if no input username, set username same to email
    if(!this.user.username) {
      this.user.username = this.user.email;
    }
    this.auth.register(this.user)
    .then((user) => {
      this.auth.studentlogin(this.user);
      console.log(user);
      sessionStorage.setItem('userid', user.result);
      this.router.navigate(['/course-selection']);
    })
    .catch((err) => {
      console.log(err);
      this.error.displaymessage("An error occurred. Refresh page and try again.");
    });
  }

  /*
  *   Check that every field is valid
  * */
  register() {
    if(!this.user.name) {
      this.error.displaymessage("Name required.");
    }
    else if(!this.user.lastname) {
      this.error.displaymessage("Last name required.");
    }
    // else if(!this.user.username) {
    //   this.error.displaymessage("Username required.");
    // }
    else if(!this.user.email || !this.user.email.includes("@") || !this.user.email.includes(".")) {
      this.error.displaymessage("A valid email is required.");
    }
    else if(!this.user.password) {
      this.error.displaymessage("Password required.");
    }
    else if(!this.passwordAgain) {
      this.error.displaymessage("Please write password again.");
    }
    else if(this.user.password != this.passwordAgain) {
      this.error.displaymessage("Passwords do not match.");
    }
    else if(!this.faculty) {
      this.error.displaymessage("Faculty required.");
    }
    else if(!this.user.program_num) {
      this.error.displaymessage("Program required.");
    }
    else if(this.user.student_num && this.user.student_num.length != 9) {
      this.error.displaymessage('Invalid student number length.');
    }
    else if(this.user.phone_num && this.user.phone_num.length != 10) {
      this.error.displaymessage('Invalid phone number length.');
    }
    else {
      this.error.hidemessage();
      this.registration();
    }
  }
}
