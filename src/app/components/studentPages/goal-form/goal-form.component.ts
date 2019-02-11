import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css']
})
export class GoalFormComponent implements OnInit {

  tasks =[];
  // task;

  constructor() { }

  ngOnInit() {
  }

  addTask(task: string) {
    console.log(task);
    // console.log(this.task);
    this.tasks.push('aaaaaaaaaaaaaaaaaaaaa');
  }

  removeTask(index: any) {
    console.log(index);
    let new_tasks = [];
    for(let i=0; i<this.tasks.length; i++) {
      if(i!=index) {
        new_tasks.push(this.tasks[i])
      }
    }
    this.tasks = new_tasks;
  }
}
