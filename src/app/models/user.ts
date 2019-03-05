export interface User {
  email: string,
  lastname: string,
  name: string,
  password: string,
  phone_num?: string,
  remember?: boolean,
  role_id: number,
  role_name: string
  user_id: number,
  username: string,
}


export class User implements User {
  email: string;
  lastname: string;
  name: string;
  password: string;
  phone_num?: string;
  remember?: boolean;
  role_id: number;
  role_name: string;
  user_id: number;
  username: string;
  constructor() {
    this.email = null;
    this.lastname = null;
    this.name = null;
    this.password = null;
    this.phone_num = null;
    this.remember = null;
    this.role_id = null;
    this.role_name = null;
    this.user_id = null;
    this.username = null;
  }
}
