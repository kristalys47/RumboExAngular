import {Component, OnInit, Inject, Input} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Task} from '../../../models/task';
import {TaskService} from '../../../services/task/task.service';
import {CourseService} from '../../../services/course/course.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


import {AuthService} from "../../../services/auth.service";
import {Student} from "../../../models/student";
import {Course, Grade, Status} from "../../../models/course";

@Component({
  selector: 'app-individual-course',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})

export class CourseDetailComponent implements OnInit {

  @Input() student: Student;

  curr_student_id: any = sessionStorage.getItem('userid');

  curr_course_id;

  course: Course;

  grades: Array<any> = [];
  progress;

  sub;

  editable;

  newGrade: Grade = new Grade();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskService: TaskService,
              private courseService: CourseService,
              public dialog: MatDialog,
              private authService: AuthService) {

    // this.router.routeReuseStrategy.shouldReuseRoute = () => {return false;}
    //
    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //      // trick the Router into believing it's last link wasn't previously loaded
    //      this.router.navigated = false;
    //      // if you need to scroll back to top, here is the right place
    //      window.scrollTo(0, 0);
    //   }
    // });


 }

  ngOnInit() {


    // get the course id from query param
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.curr_course_id = JSON.parse(params['course_id']);
      });
    // get course details from server
    this.courseService.get_course(this.curr_course_id, this.curr_student_id).subscribe(data => {
      this.course = data.Course;
      this.updateGradeStatus();
      console.log(this.course);
    });
    this.resetGrade();
    console.log(this.newGrade);
  }

  /*
  * Given a set of grades, it will calculate the average.
  * The average takes into consideration the weight of each grade and divides the sum of the grades by the percentage of
  * the weight taken up to date.
  * */
  private calculateAverage(grades: Grade[]) {
    let avg: number = 0;
    let cummulative_weight: number = 0;
    console.log(grades);
    grades.forEach(grade => {
      if(grade.grade && grade.total) {
        // todo: calcular avg cuando no se tiene weight de la nota
        avg = avg + ((grade.grade / grade.total) * grade.weight);
        cummulative_weight = cummulative_weight + grade.weight;
      }
    });
    console.log((avg/cummulative_weight * 100).toFixed(2));
    return parseFloat((avg/cummulative_weight * 100).toFixed(2));
  }

  /*
  *  Given a set of grades, calculate the cummulative grade.
  *  The cummulative grade takes into consideration the weight of each grade, and only adds the grades up to date.
  * */
  private calculateCummulativeAverage(grades: Grade[]) {
    let avg: number = 0;
    grades.forEach(grade => {
      if(grade.grade && grade.total) {
        avg = avg + ((grade.grade / grade.total) * grade.weight);
      }
    });
    return parseFloat(avg.toFixed(2));
  }

  /*
  *  Given a number as the average of the grades, return the status on course.
  * */
  private getCourseStatus(avg: number) {
    if(avg >= 90) { return Status.Excellent; }
    else if(avg >= 80) { return Status.Passing; }
    else if(avg >= 75) { return Status.Surviving; }
    else if (avg >=0 ) { return Status.NotPassing; }
    else { return Status.Undefined; }
  }

  /*
  *   When component is initialized or the array of grades modified (a grade is added, deleted or edited),
  *   this methods recalculates the gpa and the course status
  * */
  private updateGradeStatus() {
    this.course.general_average = this.calculateAverage(this.course.grades);
    this.course.status = this.getCourseStatus(this.course.general_average);
    this.course.cummulative_average = this.calculateCummulativeAverage(this.course.grades);
  }

  /*
  *   This sets every field in new Grade to null
  * */
  private resetGrade() {
    this.newGrade = {grade_id: null, name: null, date: null, weight: null, grade: null, total: null, course_id: null};
  }

  /*
  *   Add a grade to the set of grades of the course
  * */
  addGrade() {
    this.newGrade.course_id = this.course.course_id;
    console.log(typeof this.newGrade.grade, this.newGrade.grade);
    console.log(this.newGrade);
    this.courseService.insert_grade(this.curr_student_id, this.newGrade)
      .then(res => {
      console.log(res);
      this.newGrade.grade_id = res.grade_id;
      console.log(this.newGrade);
      // add grade to Grades array
      this.course.grades.push(this.newGrade);
      // set newGrade to null for next grade
      this.resetGrade();
      // this.newGrade = {grade_id: null, name: null, date: null, weight: null, grade: null, total: null};
      // update gpa and status
      this.updateGradeStatus();
    })
      .catch(err => {console.log(err);});
  }

  /*
  *   Update a grade whose information has been modified
  * */
  updateGrade(grade, newName, newDate, newWeight, newGrade, newTotal) {
    console.log(grade);
    if(grade.name!=newName){
      this.courseService.edit_grade(this.curr_student_id,{'g_id': grade.grade_id, 'g_name': newName});
      grade.name = newName;
    }
    if(grade.date!=newDate){
      this.courseService.edit_grade(this.curr_student_id,{'g_id': grade.grade_id, 'date': newDate});
      grade.date = newDate;
    }
    if(grade.weight!=newWeight){
      this.courseService.edit_grade(this.curr_student_id,{'g_id': grade.grade_id, 'weight': newWeight});
      grade.weight = newWeight;
      this.updateGradeStatus();
    }
    if(grade.grade!=newGrade){
      this.courseService.edit_grade(this.curr_student_id,{'g_id': grade.grade_id, 'grade': newGrade});
      grade.grade = newGrade;
      this.updateGradeStatus();
    }
    if(grade.total!=newTotal){
      this.courseService.edit_grade(this.curr_student_id,{'g_id': grade.grade_id, 'total': newTotal});
      grade.total = newTotal;
      this.updateGradeStatus();
    }
    // prevent grade from being editable any more
    this.editable = null;
  }

  /*
  *   Delete a grade
  * */
  deleteGrade(grade_id) {
    // send delete request to server
    this.courseService.remove_grade(this.curr_student_id, grade_id)
      // if delete was successful in db
      .then(res => {
        console.log(res);
        // remove grade from array
        this.course.grades = this.course.grades.filter(grade => {
          if (grade.grade_id!=grade_id) {return grade;}
        });
        // update new gpa and status without deleted grade
        this.updateGradeStatus();
      })
      .catch(err => {console.log(err);})
  }

  /*
  *  Check a task and change the finished status;
  *  If it is done, it will change to undone; If undone, it will change to done.
  * */
  checkTask(task: Task) {
    console.log(task.finished);
    task.finished = !task.finished;
    console.log(task.finished);
    console.log(this.course.tasks);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  createTask(data) {
    console.log('data:', data);
    var title = data['title'];
    var description = data['description'];
    var start = data['start'];
    var end = data['end'];
    // var task = new Task(title, description, start, end, false);
    // console.log(task);
    // this.taskService.insert_study_task(data, this.curr_student_id, this.curr_course_id);
    this.authService.insert_study_task(data, this.curr_student_id, this.curr_course_id);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}

