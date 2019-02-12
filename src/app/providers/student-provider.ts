import {Injectable} from "@angular/core";
import {Student} from "../models/student";
import {Course} from "../models/course";
import {Task} from "../models/task";

@Injectable()
export class StudentProvider {

  public student: Student;
  public courses: Course[];
  public tasks: Task[];

  public constructor() {}

}
