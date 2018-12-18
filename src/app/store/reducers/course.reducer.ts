import { Action } from '@ngrx/store';
import {Course} from "../../models/course";
import * as courseActions from "../actions/course.actions";


export interface State {
  courses: Course[]
}

export const initialState: State = {
  courses: []
};

export function reducer(state = initialState, action: courseActions.CourseActions): State {
  switch (action.type) {
    case courseActions.CourseActionTypes.SetCourses:
      console.log(action.payload);
      return {courses: action.payload};

    default:
      return state;
  }

}
