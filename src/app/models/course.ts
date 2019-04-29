import {Task} from "./task";

export interface Course {
  course_id: number,
  codification: string,
  name: string,
  professor_id?: number,
  section_num: string,
  time: Time[],
  grades: Grade[],
  cummulative_average?: number,
  general_average?: number,
  status: Status,
  tasks: Task[]
}

export interface Grade {
  grade_id: number,
  name: string,
  date: string,
  grade: number,
  total: number,
  weight: number,
  course_id?: number
}

export class Grade implements Grade {
  constructor(
    grade_id?: number,
    name?: string,
    date?: string,
    grade?: number,
    total?:number,
    weight?: number,
    course_id?: number
  ) {}
}

interface Time {
  day: string,
  start: number,
  end: number
}

export enum Status {
  Excellent=4,
  Passing=3,
  Surviving=2,
  NotPassing=1,
  Undefined=0
}
