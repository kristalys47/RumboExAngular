import {Component, Input, OnInit} from '@angular/core';
import {Student} from "../../../models/student";
import {Course} from "../../../models/course";
import {Task} from '../../../models/task';
import {StudentService} from "../../../services/student/student.service";

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

  student;
  // @Input() student: StudentDetail;

  constructor(private studentService: StudentService) {
    // console.log(this.student);
  }

  ngOnInit() {
    this.studentService.getStudent(0).subscribe(data => {
      this.student = data;
    })
  }

}
