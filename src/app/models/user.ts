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


export class User {
    constructor(
      email?: string,
      lastname?: string,
      name?: string,
      password?: string,
      phone_num?: string,
      remember?: boolean,
      role_id?: number,
      role_name?: string,
      User_id?: number,
      username?: string)
    {}
}
