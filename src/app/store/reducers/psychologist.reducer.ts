import { Action } from '@ngrx/store';
import { Student } from '../../models/student';
import * as PsychologistAction from '../actions/psychologist.actions';

export interface State {
  students: Student[];        // We are going to have a list of students constantly
  loaded: boolean;
  loading: boolean;
}

export const initialState: State = {
  students: [
    {"department_name": "Ingenieria de computadoras",
      "department_num" : 1234,
      "email": "lanena@you.com",
      "enrolled_program": 1234,
      "lastname": "Carrion",
      "name": "Lila",
      "password": "labebe",
      "program_name": "Ingenieria en computadoras",
      "role_id": 1,
      "role_name": "student",
      "student_num": 802364584,
      "user_id": 37,
      "username": "lanena" },
{
      "department_name": "Ingenieria de computadoras",
      "department_num" : 1234,
      "email": "create@beba.com",
      "enrolled_program": 1234,
      "lastname": "prueba",
      "name": "la",
      "password": "labeba",
      "program_name": "Ingenieria en computadoras",
      "role_id": 1,
      "role_name": "student",
      "student_num": 4758124,
      "user_id": 38,
      "username": "prueba"
  },
{
      "department_name": "Ingenieria de computadoras",
      "department_num" : 1234,
      "email": "bibi@beba.com",
      "enrolled_program": 1234,
      "lastname": "pruebas",
      "name": "las",
      "password": "bibi",
      "program_name": "Ingenieria en computadoras",
      "role_id": 1,
      "role_name": "student",
      "student_num": 4758745,
      "user_id": 39,
      "username": "bibi"
}],
  loaded: false,
  loading: false,
};

export function reducer(state = initialState, action: PsychologistAction.PsychologistActions): State {
  switch(action.type) {
    case  PsychologistAction.PsychologistActionTypes.LoadStudents:{
      return {
        ...state,
        loading: true
      };
    }
    case  PsychologistAction.PsychologistActionTypes.LoadStudents_Fail:{
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case  PsychologistAction.PsychologistActionTypes.LoadStudents_Success:{
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }

    default:
      return state;
  }

}
//This functions are used to export one level up the states of our reducer
// this can be passed to the selector function
export const getStudentLoading = (state: State) => state.loading;
export const getStudentLoaded = (state: State) =>  state.loaded;
export const getStudent = (state: State) => state.students;
