import {User} from "./user";

export interface Student extends User {
  faculty_name: string,
  faculty_num: number,
  program_name: string,
  program_num: number,
  student_num: number,
}

export class Student extends User {
  constructor(
    faculty_name?: string,
    faculty_num?: number,
    program_name?: string,
    program_num?: number,
    student_num?: number)
    {
      super();
    }
}
