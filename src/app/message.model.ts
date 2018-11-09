export interface Message {
  name: string;
  from: string;
  subject: string;
  service: string;
  body: string;
  date: Date;
  done: boolean;
  new: boolean;
}

export interface Reply {
  body: string;
  date: Date;
  me: boolean;
  delivered: boolean;
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
