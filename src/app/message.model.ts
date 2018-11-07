interface Message {
  name: string;
  from: string;
  subject: string;
  body: string;
  date: Date;
  done: boolean;
  replies?: {me: boolean, body: string, data: Date} [];
}

interface Email {
  to: string;
  subject: string;
  body: string;
  date: Date;
}
