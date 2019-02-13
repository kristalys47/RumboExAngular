import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user';
import {Student} from "../../../models/student";
import {ErroralertService} from "../../../services/erroralert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Student = new Student();
  passwordAgain;
  faculty = [
    {name: 'Ingenieria', num: 1, programs: [
        {name: 'Ingenieria Mecanica', num: 1}
        ]
    }
  ];

  constructor(private auth: AuthService, private router: Router, private error: ErroralertService) { }

  ngOnInit() {
  }

  registration(): void {
    this.auth.register(this.user)
    .then((user) => {
      console.log(user);
      this.router.navigate(['/studentmain']);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  register() {
    if(!this.user.name) {
      this.error.displaymessage("Name required.");
    }
    else if(!this.user.lastname) {
      this.error.displaymessage("Last name required.");
    }
    else if(!this.user.username) {
      this.error.displaymessage("Username required.");
    }
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
    else if(!this.user.faculty_num) {
      this.error.displaymessage("Faculty required.");
    }
    else if(!this.user.program_num) {
      this.error.displaymessage("Program required.");
    }
    else {
      console.log(this.user);
      this.error.hidemessage();
      this.registration();
    }
  }
}
