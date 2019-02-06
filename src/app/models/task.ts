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

enum Type {
  Study,
  Course,
  Personal,
  Appointment
}
