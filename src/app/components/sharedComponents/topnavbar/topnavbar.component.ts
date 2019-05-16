import { Component, OnInit } from '@angular/core';
import {StudentProvider} from "../../../providers/student-provider";
import {StudentService} from "../../../services/student/student.service";
import {StudentProviderService} from "../../../providers/student-provider/student-provider.service";
import {User} from "../../../models/user";


@Component({
  selector: 'app-topnavbar',
  templateUrl: './topnavbar.component.html',
  styleUrls: ['./topnavbar.component.css']
})
export class TopnavbarComponent implements OnInit {

  curr_user_id = sessionStorage.getItem('userid');
  role = sessionStorage.getItem('role');
  mainpath = '/'+this.role+'main'
  // user = sessionStorage.getItem('token');
  user: User = new User();

  constructor(private data: StudentProviderService, private studentService: StudentService) { }

  ngOnInit() {

    // $.myTheme.navbar.activate();

    this.studentService.getStudent(this.curr_user_id).subscribe(data => {
      this.user = data;
    });

    // this.data.loadStudent(this.curr_user_id).then( (data) => {
    //   console.log(data);
    //     this.user = this.data.student;
    //   }
    // ).catch((err) => {
    //   console.log(err);
    // });

    // this.user = this.studentService.student;
  }

}
