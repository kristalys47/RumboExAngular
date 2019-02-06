import {Task} from "./task";

export interface Course {
  id: number,
  codification: string,
  name: string,
  professor_id: number,
  section: string,
  grades: Grade[],
  cumulative_average: number,
  general_average,
  status: Status,
  tasks: Task[]
}

export interface Grade {
  evaluation: string,
  grade: number,
  weight: number,
  total: number
}

export enum Status {
  Excellent=4,
  Passing=3,
  Surviving=2,
  NotPassing=1
}
