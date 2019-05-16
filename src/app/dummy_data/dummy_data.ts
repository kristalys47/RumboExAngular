import {Course, Grade, Status} from "../models/course";
import {Task} from "../models/task";
import {Student} from "../models/student";

export const courses: Course[] = [
  {
    course_id: 0,
    codification: 'MATE3001',
    name: 'Precalculo 1',
    credits: 3,
    professor_id: 802899000,
    section_num: '010',
    grades: [
      {
        grade_id: 1,
        name: 'Examen 1',
        date: '2019-02-18',
        grade: 75,
        weight: 15,
        total: 100
      },
      {
        grade_id: 2,
        name: 'Quiz',
        date: '2019-02-18',
        grade: 5,
        weight: 5,
        total: 5
      }
    ],
    cummulative_average: 20,
    general_average: 75,
    status: Status.Surviving,
    tasks: [
      {
        title: 'Hacer el taller',
        description: 'pag 2-3',
        start: 'Mon, 11 Feb 2018 08:00:00 GMT',
        end: 'Mon, 11 Feb 2018 08:00:00 GMT',
        finished: false,
      },
      {
        title: 'Estudiar para examen',
        description: 'capitulo 1',
        start: 'Mon, 4 Feb 2018 08:00:00 GMT',
        end: 'Mon, 4 Feb 2018 08:00:00 GMT',
        finished: true,
      }
    ],
    time: []
  },
  {
    course_id: 1,
    codification: 'HUMA3001',
    name: 'Humanidades',
    credits: 3,
    professor_id: 802889000,
    section_num: '020',
    grades: null,
    cummulative_average: 40,
    general_average: 80,
    status: Status.Passing,
    tasks: [
      {
        title: 'Leer',
        description: 'pag 80-90',
        start: 'Sun, 10 Feb 2018 08:00:00 GMT',
        end: 'Sun, 10 Feb 2018 08:00:00 GMT',
        finished: false,
      }
    ],
    time: []
  }
];

export const students: Student[] = [
  {
    user_id: 802,
    username: 'lila',
    password: 'lila',
    email: 'lila@upr.edu',
    name: 'Lila',
    lastname: "Carrion",
    faculty_name: 'Artes y Ciencias',
    faculty_num: 10,
    program_num: 10,
    program_name: 'Psicologia',
    student_num: '8020000000',
    role_id: 1,
    role_name: 'student',
    gpa: 3.41
  },
  {
    user_id: 803,
    username: 'juan',
    password: 'juan',
    email: 'juan@upr.edu',
    name: 'Juan',
    lastname: "Alvarado",
    faculty_name: 'Ingenieria',
    faculty_num: 12,
    program_num: 12,
    program_name: 'Ingenieria Electrica',
    student_num: '8021111111',
    role_id: 1,
    role_name: 'student',
    gpa: 3.20
  }
];

export const tasks: Task[] = [
  {
    title: 'Hacer el taller',
    description: 'pag 2-3',
    start: 'Mon, 11 Feb 2019 08:00:00 GMT',
    end: 'Mon, 11 Feb 2019 08:00:00 GMT',
    finished: false,
    course: 0
  },
  {
    title: 'Estudiar para examen',
    description: 'capitulo 1',
    start: 'Mon, 4 Feb 2019 08:00:00 GMT',
    end: 'Mon, 4 Feb 2019 08:00:00 GMT',
    finished: true,
    course: 0
  },
  {
    title: 'Leer',
    description: 'pag 80-90',
    start: 'Sun, 10 Feb 2019 08:00:00 GMT',
    end: 'Sun, 10 Feb 2019 08:00:00 GMT',
    finished: false,
    course: 1
  }
];
