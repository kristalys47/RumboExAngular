import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromStudent from './student.reducer';
import * as fromCourse from './course.reducer';
import * as fromTask from './task.reducer';
// import * as fromPsychologist from './psychologist.reducer';

export interface State {
  student: fromStudent.State;
  course: fromCourse.State;
  task: fromTask.State;
  // psychologist: fromPsychologist.State;
}

export const reducers: ActionReducerMap<State> = {
  student: fromStudent.reducer,
  course: fromCourse.reducer,
  task: fromTask.reducer,
  // psychologist: fromPsychologist.reducer,

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
export const getStudents_Psyc = createFeatureSelector('student');
//export const PsychState = createSelector();
