import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CommentButtonComponent} from "../../comment-button/comment-button.component";
import {StudentService} from "../../../services/student/student.service";

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css']
})
export class MentorsComponent implements OnInit {

  curr_user_id = sessionStorage.getItem('userid');
  counselor;
  psychologist;

  constructor(private router: Router,
              private commentComponent: CommentButtonComponent,
              private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getMentorsByStudentId(this.curr_user_id).subscribe(data => {
      data.Mentors.forEach(mentor => {
        if (mentor.role_name=='counselor')
          this.counselor = mentor;
        else if (mentor.role=='psychologist')
          this.psychologist = mentor;
      })
    });
  }

  goToForm(role: 'counselor' | 'psychologist') {
    this.router.navigate([ '/studentmain', { outlets: { content: 'appointment-form' } }],
      {queryParams: {mentor: role}});
  }

  sendMessage(send_to_id: number) {
    this.commentComponent.openForm(send_to_id);
  }
}
