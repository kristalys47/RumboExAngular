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
import * as fromPsychologist from './psychologist.reducer';
import {getStudent} from './psychologist.reducer';

export interface State {
  student: fromStudent.State;
  course: fromCourse.State;
  task: fromTask.State;
  psychologist: fromPsychologist.State;
}

export const reducers: ActionReducerMap<State> = {
  student: fromStudent.reducer,
  course: fromCourse.reducer,
  task: fromTask.reducer,
  psychologist: fromPsychologist.reducer,

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
export const getStudentsState_Psyc = createFeatureSelector<State>(
  'psychologist'
);
//getting the state of the list of students in the psych reducer
export const getState_PsychStudents = createSelector(
   getStudentsState_Psyc,
  (state: State) => state.psychologist
);

//Here we are getting the states of the psychologist reducers, those three methosd we created in the reducers
export const getALlStudents = createSelector( getState_PsychStudents, fromPsychologist.getStudent);
export const getALlStudentsLoading = createSelector(getState_PsychStudents, fromPsychologist.getStudentLoading);
export const getALlStudentsLoaded = createSelector(getState_PsychStudents, fromPsychologist.getStudentLoaded);









