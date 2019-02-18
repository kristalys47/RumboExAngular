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
    this.studentService.getFaculties().subscribe(data => {
      this.faculty = data.Faculties;
    })
  }

  registration(): void {
    if(!this.user.username) {
      this.user.username = this.user.email;
    }
    this.auth.register(this.user)
    .then((user) => {
      console.log(user);
      // sessionStorage.setItem('userid', user.result.userid);
      this.router.navigate(['/studentlogin']);
    })
    .catch((err) => {
      console.log(err);
      this.error.displaymessage("An error occurred. Refresh page and try again.");
    });
  }

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
    else {
      this.error.hidemessage();
      this.registration();
    }
  }
}
