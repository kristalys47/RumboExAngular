export interface Message {
  m_id: number,
  chat_id: number,
  sent_by: number,
  sent_to: number,
  date: string,
  text: string,
  seen: boolean
}

export class Message implements Message {
  constructor(
    m_id?: number,
    chat_id?: number,
    sent_by?: number,
    sent_to?: number,
    date?: string,
    text?: string,
    seen?: boolean
  ) {}
}

export interface Chat {
  chat_id: number,
  contact: {
    user_id: number,
    username: string,
    name: string,
    lastname: string,
    email: string
  },
  messages: Array<Message>
}
