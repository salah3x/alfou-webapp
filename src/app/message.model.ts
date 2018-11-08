interface Message {
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

interface MessageWithId extends Message {
  id: string;
}

interface Email {
  to: string;
  subject: string;
  body: string;
  delivered: boolean;
  date: Date;
}
