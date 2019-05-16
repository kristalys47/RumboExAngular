import {User} from "./user";

export interface Student extends User {
  faculty_name: string,
  faculty_num: number,
  program_name: string,
  program_num: number,
  student_num: string,
  gpa: number
}

export class Student extends User implements Student {
  faculty_name: string;
  faculty_num: number;
  program_name: string;
  program_num: number;
  student_num: string;
  gpa: number;
  constructor() {
    super();
    this.faculty_name = null;
    this.faculty_num = null;
    this.program_name = null;
    this.program_num = null;
    this.student_num = null;
    this.gpa = null;
  }
}
