import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {AngularMaterialModule} from './angular-material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// import {GoogleChartsModule} from 'angular-google-charts';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/logins/login/login.component';
import { AuthService } from './services/auth.service';
import { StatusComponent } from './components/status/status.component';
import { StudentmainComponent } from './components/mains/studentmain/studentmain.component';
import { ScheduleComponent } from './components/schedule-viejo/schedule.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuard} from './guards/auth.guard';

import { TaskService } from './services/task/task.service';
import { AdminloginComponent } from './components/logins/adminlogin/adminlogin.component';
import { StudentloginComponent } from './components/logins/studentlogin/studentlogin.component';
import { CounselorloginComponent } from './components/logins/counselorlogin/counselorlogin.component';
import { MentorloginComponent } from './components/logins/mentorlogin/mentorlogin.component';
import { ProfessorloginComponent } from './components/logins/professorlogin/professorlogin.component';
import { RegisterComponent } from './components/register/register.component';
import {AdminGuard} from './guards/admin.guard';
import { StudentGuard } from './guards/student.guard';
import { AdvisorloginComponent } from './components/logins/advisorlogin/advisorlogin.component';
import { CounselormainComponent } from './components/mains/counselormain/counselormain.component';
import { AdminmainComponent } from './components/mains/adminmain/adminmain.component';
import {StudentService} from './services/student/student.service';
import {ErroralertService} from './services/erroralert.service';
import { ErroralertComponent } from './components/erroralert/erroralert.component';
import { SidebarComponent } from './components/sharedComponents/sidebar/sidebar.component';
import { TopnavbarComponent } from './components/sharedComponents/topnavbar/topnavbar.component';
import { BreadcrumbComponent } from './components/sharedComponents/breadcrumb/breadcrumb.component';
import { CalendarComponent } from './components/schedule/calendar/calendar.component';
import { DailyScheduleComponent } from './components/schedule/daily-schedule/daily-schedule.component';
import { WeeklyScheduleComponent } from './components/schedule/weekly-schedule/weekly-schedule.component';

import { NewCourseTaskForm } from './components/studentPages/course-detail/course-detail.component';

import { WidgetComponent } from './components/widget/widget.component';
import { CourseDetailComponent } from './components/studentPages/course-detail/course-detail.component';
import { LoginmenuComponent } from './components/loginmenu/loginmenu.component';
import { DashboardComponent } from './components/studentPages/dashboard/dashboard.component';
import {MaterialsModule} from './materials/materials.module';
import {PopoverComponent} from './components/popover/popover.component';
import {ModalComponent} from './components/modal/modal.component';
import {CourseService} from './services/course/course.service';
import {GooglechartService} from './services/googlechart.service';
import { ProfileComponent } from './components/profile/profile.component';

import {MsgInputForm} from "./components/comment-button/comment-button.component";

// import {StoreModule} from '@ngrx/store';
// import {reducer} from './store2/reducers/student.reducer';
// import {EffectsModule} from "@ngrx/effects";
// import {StudentEffect} from "./store2/effects/student.effect";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './store/reducers';
import { environment } from '../environments/environment';
import { StudentEffects } from './store/effects/student.effects';
import {CourseEffects} from "./store/effects/course.effects";
import { PsychologistmainComponent } from './components/mains/psychologistmain/psychologistmain.component';
import { MessagesComponent } from './components/messages/messages.component';
import {TaskEffects} from "./store/effects/task.effects";
import { MentormainComponent } from './components/mains/mentormain/mentormain.component';
import { StudentListComponent } from './components/mentorsPage/student-list/student-list.component';
import { NotificationsComponent } from './components/sharedComponents/notifications/notifications.component';
import {MessagesMenuComponent} from './components/sharedComponents/messages/messages-menu.component';
import { PsychologistloginComponent } from './components/logins/psychologistlogin/psychologistlogin.component';
import { StudentTableComponent } from './components/mentorsPage/student-table/student-table.component';
import { ChatComponent } from './components/chat/chat.component';
import { AppointmentFormComponent } from './components/studentPages/appointment-form/appointment-form.component';
import { MentorsComponent } from './components/studentPages/mentors/mentors.component';
import { StudentDetailComponent } from './components/mentorsPage/student-detail/student-detail.component';
import { GoalFormComponent } from './components/studentPages/goal-form/goal-form.component';
import { SortPipe } from './pipes/sort/sort.pipe';
import { FilterPipe } from './pipes/filter/filter.pipe';
import { CommentButtonComponent } from './components/comment-button/comment-button.component';
import {FormModal, TaskFormComponent} from './components/studentPages/task-form/task-form.component';
import { StudentCoursesTableComponent } from './components/student-courses-table/student-courses-table.component';
import { MentorCalendarComponent } from './components/mentorsPage/mentor-calendar/mentor-calendar.component';
import { TimeManagementPieChartComponent } from './components/time-management-pie-chart/time-management-pie-chart.component';
import {DialogMessageComponent} from "./components/dialog-message/dialog-message.component";
import { GradeGaugeComponent } from './components/grade-gauge/grade-gauge.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StatusComponent,
    StudentmainComponent,
    ScheduleComponent,
    LogoutComponent,
    AdminloginComponent,
    StudentloginComponent,
    CounselorloginComponent,
    MentorloginComponent,
    ProfessorloginComponent,
    PsychologistloginComponent,
    RegisterComponent,
    AdvisorloginComponent,
    CounselormainComponent,
    AdminmainComponent,
    ErroralertComponent,
    SidebarComponent,
    TopnavbarComponent,
    BreadcrumbComponent,
    DashboardComponent,
    CalendarComponent,
    DailyScheduleComponent,
    WeeklyScheduleComponent,
    WidgetComponent,
    CourseDetailComponent,
    NewCourseTaskForm,
    MsgInputForm,
    LoginmenuComponent,
    PopoverComponent,
    ModalComponent,
    ProfileComponent,
    PsychologistmainComponent,
    MessagesComponent,
    MentormainComponent,
    StudentListComponent,
    NotificationsComponent,
    MessagesMenuComponent,
    StudentTableComponent,
    ChatComponent,
    AppointmentFormComponent,
    MentorsComponent,
    StudentDetailComponent,
    GoalFormComponent,
    SortPipe,
    FilterPipe,
    CommentButtonComponent,
    TaskFormComponent,
    FormModal,
    StudentCoursesTableComponent,
    MentorCalendarComponent,
    DialogMessageComponent,
    TimeManagementPieChartComponent,
    GradeGaugeComponent,
    // NotificationsComponent
  ],
  imports: [
    MbscModule,
    BrowserModule,
    FormsModule,
    MaterialsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  // Need to write Components which are dialogs here
  entryComponents: [
    MsgInputForm,
    FormModal,
    DialogMessageComponent
  ],
  // entryComponents: [NewCourseTaskForm, NewTaskForm],
  // Each guard just check that the user have an specific characteristic to authorize the navegation. In this case it checks that the user
  // have the role to enter the respective pages. It is like and RBAC but for Angular.
  providers: [AuthService, TaskService, AuthGuard, AdminGuard, StudentGuard, StudentService, ErroralertService, CourseService, GooglechartService],
  bootstrap: [AppComponent]
})

export class AppModule { }
