export interface Task {
    title: string,
    description: string,
    start: string,
    end: string,
    finished: boolean,
    // user_id?: number
    type?: Type;
    course?: number;
}

export class Task implements Task {
  constructor(
    title?: string,
    description?: string,
    start?: string,
    end?: string,
    finished?: boolean,
    type?: Type,
    course?: number
  ) {}
}

export enum Type {
  Study,
  Personal,
  Course,
  Appointment
}
