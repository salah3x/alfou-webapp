export interface Message {
  name: string;
  from: string;
  subject: string;
  service: string;
  body: string;
  date: Date;
  done: boolean;
  new: boolean;
  replies?: {me: boolean, body: string, date: Date} [];
}

export interface MessageWithId extends Message {
  id: string;
}

export interface Email {
  to: string;
  subject: string;
  body: string;
  delivered: boolean;
  date: Date;
}
