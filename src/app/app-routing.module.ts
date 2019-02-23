import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './components/logins/login/login.component';
import {MentorloginComponent} from './components/logins/mentorlogin/mentorlogin.component';
import {AdminloginComponent} from './components/logins/adminlogin/adminlogin.component';
import {CounselorloginComponent} from './components/logins/counselorlogin/counselorlogin.component';
import {ProfessorloginComponent} from './components/logins/professorlogin/professorlogin.component';
import {AdvisorloginComponent} from './components/logins/advisorlogin/advisorlogin.component';
import {StudentloginComponent} from './components/logins/studentlogin/studentlogin.component';

import {ScheduleComponent} from './components/schedule/schedule.component';
import {StudentmainComponent} from './components/mains/studentmain/studentmain.component';
import {RegisterComponent} from './components/registers/register/register.component';
import {AdminmainComponent} from './components/mains/adminmain/adminmain.component';
import {LogoutComponent} from './components/logout/logout.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {StatusComponent} from './components/status/status.component';
import {AdminGuard} from './guards/admin/admin.guard';

import {WeeklyScheduleComponent} from './components/schedule-mbsc/weekly-schedule/weekly-schedule.component';
import {DailyScheduleComponent} from './components/schedule-mbsc/daily-schedule/daily-schedule.component';
import {CalendarComponent} from './components/schedule-mbsc/calendar/calendar.component';

import {CourseDetailComponent, NewCourseTaskForm} from './components/studentPages/course-detail/course-detail.component';
import {DashboardComponent} from './components/studentPages/dashboard/dashboard.component';
import {LoginmenuComponent} from './components/loginmenu/loginmenu.component';
import {ProfileComponent} from "./components/profile/profile.component";
import {CounselormainComponent} from "./components/mains/counselormain/counselormain.component";
import {WidgetComponent} from "./components/widget/widget.component";
import {AppComponent} from "./app.component";
import {ModalComponent} from "./components/modal/modal.component";
import {PsychologistmainComponent} from "./components/mains/psychologistmain/psychologistmain.component";
import {ErroralertComponent} from "./components/erroralert/erroralert.component";
import {MessagesComponent} from "./components/messages/messages.component";
import {SidebarComponent} from "./components/sharedComponents/sidebar/sidebar.component";
import {BreadcrumbComponent} from "./components/sharedComponents/breadcrumb/breadcrumb.component";
import {TopnavbarComponent} from "./components/sharedComponents/topnavbar/topnavbar.component";
import {PopoverComponent} from "./components/popover/popover.component";
import {MentormainComponent} from "./components/mains/mentormain/mentormain.component";
import {MentorsComponent} from "./components/studentPages/mentors/mentors.component";
import {AppointmentFormComponent} from "./components/studentPages/appointment-form/appointment-form.component";
import {ChatComponent} from "./components/chat/chat.component";
import {StudentDetailComponent} from "./components/mentorsPage/student-detail/student-detail.component";
import {StudentListComponent} from "./components/mentorsPage/student-list/student-list.component";
import {GoalFormComponent} from "./components/studentPages/goal-form/goal-form.component";
import {MentorCalendarComponent} from "./components/mentorsPage/mentor-calendar/mentor-calendar.component";
import {NotificationsComponent} from "./components/sharedComponents/notifications/notifications.component";
import {CounselorRegisterComponent} from "./components/registers/counselor-register/counselor-register.component";
import {PsychologistRegisterComponent} from "./components/registers/psychologist-register/psychologist-register.component";
import {AnfitrionRegisterComponent} from "./components/registers/anfitrion-register/anfitrion-register.component";
import {CourseSelectionComponent} from "./components/registers/course-selection/course-selection.component";


const routes: Routes = [

  // This part are the login's. They don't use guard. (The guard of the login is practically the code in flask.)
  { path: 'loginmenu', component: LoginmenuComponent },
  { path: 'login', component: LoginComponent },
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'studentlogin', component: StudentloginComponent },
  { path: 'counselorlogin', component: CounselorloginComponent },
  { path: 'mentorlogin', component: MentorloginComponent },
  { path: 'professorlogin', component: ProfessorloginComponent },
  { path: 'advisorlogin', component: AdvisorloginComponent },

  // This things haves to be guarded and classified
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },

  { path: 'register', component: RegisterComponent },
  { path: 'course-selection', component: CourseSelectionComponent },
  { path: 'counselorRegister', component: CounselorRegisterComponent },
  { path: 'psychologistRegister', component: PsychologistRegisterComponent },
  { path: 'anfitrionRegister', component: AnfitrionRegisterComponent },

  { path: 'status', component: StatusComponent},
  // { path: 'schedule-mbsc-viejo', component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: 'adminmain', component: AdminmainComponent, canActivate: [AdminGuard]},

  // Student app routes
  // { path: '', redirectTo: '/studentmain', pathMatch: 'full' },
  { path: 'studentmain', component: StudentmainComponent,  canActivate: [AuthGuard], children: [
    // why this doesnt work?
    //   { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'calendar', component: CalendarComponent, outlet: 'content' },
      { path: 'today', component: DailyScheduleComponent, outlet: 'content' },
      { path: 'this-week', component: WeeklyScheduleComponent, outlet: 'content' },

      { path: 'schedule', component: ScheduleComponent, outlet: 'content' },

      { path: 'course', component: CourseDetailComponent, outlet: 'content' },
      { path: 'dashboard', component: DashboardComponent, outlet: 'content'},
      { path: 'profile', component: ProfileComponent, outlet: 'content'},
      { path: 'mentors', component: MentorsComponent, outlet: 'content' },
      { path: 'appointment-form', component: AppointmentFormComponent, outlet: 'content' },
      { path: 'chat', component: ChatComponent, outlet: 'content' },
      { path: 'goal-form', component: GoalFormComponent, outlet: 'content' },
      // { path: 'notifications', component: NotificationsComponent, outlet: 'content' }


    ]
  },

  // Mentor routes
  { path: 'mentormain', component: MentormainComponent, canActivate: [AuthGuard], children: [
      { path: 'profile', component: ProfileComponent, outlet: 'content'},
      { path: 'student-detail', component: StudentDetailComponent, outlet: 'content' },
      { path: 'student-list', component: StudentListComponent, outlet: 'content' },
      { path: 'home', component: MentorCalendarComponent, outlet: 'content' },
      // { path: 'notifications', component: NotificationsComponent, outlet: 'content' }
    ]
  },

  //Counselor routes
  { path: 'counselormain', component: CounselormainComponent, canActivate: [AuthGuard], children: [
      { path: 'profile', component: ProfileComponent, outlet: 'content'}
    ]
  },

  // Psychologist routes
  { path: 'psychologistmain', component: PsychologistmainComponent, canActivate: [AuthGuard], children: [
      { path: 'profile', component: ProfileComponent, outlet: 'content'}
    ]
  },

  // default path, when the path in the URL is empty
  { path: '', component: LoginmenuComponent },
  // when the requested URL doesn't match any defined path
  { path: '**', redirectTo: '/' },
];

@NgModule({
  // declarations: [
  //   AppComponent,
  //   LoginComponent,
  //   StatusComponent,
  //   StudentmainComponent,
  //   ScheduleComponent,
  //   LogoutComponent,
  //   AdminloginComponent,
  //   StudentloginComponent,
  //   CounselorloginComponent,
  //   MentorloginComponent,
  //   ProfessorloginComponent,
  //   RegisterComponent,
  //   AdvisorloginComponent,
  //   CounselormainComponent,
  //   AdminmainComponent,
  //   ErroralertComponent,
  //   SidebarComponent,
  //   TopnavbarComponent,
  //   BreadcrumbComponent,
  //   DashboardComponent,
  //   CalendarComponent,
  //   DailyScheduleComponent,
  //   WeeklyScheduleComponent,
  //   WidgetComponent,
  //   CourseDetailComponent,
  //   NewTaskFormComponent,
  //   NewCourseTaskForm,
  //   NewTaskForm,
  //   LoginmenuComponent,
  //   PopoverComponent,
  //   ModalComponent,
  //   ProfileComponent,
  //   PsychologistmainComponent,
  //   MessagesMenuComponent
  // ],
  imports: [ RouterModule.forRoot(routes
    // Uncomment this for testing purposes
    // ,{enableTracing: true}
    ) ],
  // entryComponents: [NewCourseTaskForm, NewTaskForm],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
