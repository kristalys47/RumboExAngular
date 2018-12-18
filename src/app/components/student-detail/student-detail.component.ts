import {Component, Input, OnInit} from '@angular/core';
import {Student} from "../../models/student";
import {Course} from "../../models/course";
import {Task} from '../../models/task';

interface StudentDetail {
  student: Student,
  courses: Course[],
  tasks: Task[]
}


@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  // @Input() student: StudentDetail;

  student = {
    student: {
      department_name: "Ingenieria de computadoras",
      department_num: 1234,
      email: "lanena@you.com",
      enrolled_program: 1234,
      lastname: "Carrion",
      name: "Lila",
      password: "labebe",
      program_name: "Ingenieria en computadoras ",
      role_id: 1,
      role_name: "student",
      student_num: 802364584,
      user_id: 37,
      username: "lanena"
    },
    courses: [
      {
        codification: 5016,
        course_name: "Data Bases",
        general_average: 85,
        professor_id: 802850000,
        section: 20,
        user_id: 37,
        status: 1
    },
    {
        codification: 5488,
        course_name: "Data Structures",
        general_average: 50,
        professor_id: 802850000,
        section: 58,
        user_id: 37,
        status: 3
    },
    ]
  };

  constructor() {
    console.log(this.student);
  }

  ngOnInit() {
  }

}
