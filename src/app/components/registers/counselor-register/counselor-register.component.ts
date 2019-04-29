import { Component, OnInit } from '@angular/core';
import {Student} from "../../../models/student";
import {ErroralertService} from "../../../services/erroralert.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";

@Component({
  selector: 'app-counselor-register',
  templateUrl: './counselor-register.component.html',
  styleUrls: ['./counselor-register.component.css']
})
export class CounselorRegisterComponent implements OnInit {

  user: User = new User();
  passwordAgain;
  input_key: string = '';
  KEY:string = 'secret';

  constructor(private auth: AuthService, private router: Router, private error: ErroralertService) { }

  ngOnInit() {
  }

  registration(): void {
    this.auth.counselorregister(this.user)
    .then((user) => {
      console.log(user);
      this.router.navigate(['/counselorlogin'])
        .then(result => {
          console.log(result);
          alert('Registration successful! You can now login.');
        })
        .catch(err => {console.log(err);});
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
    else if(this.input_key != this.KEY) {
      console.log(this.input_key, this.KEY);
      this.error.displaymessage("Invalid key.");
    }
    else {
      console.log(this.user);
      this.error.hidemessage();
      this.registration();
    }
  }
}
