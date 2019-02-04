import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css']
})
export class MentorsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToForm(role: 'counselor' | 'psychologist') {
    this.router.navigate([ '/studentmain', { outlets: { content: 'appointment-form' } }],
      {queryParams: {mentor: role}});
  }
}
