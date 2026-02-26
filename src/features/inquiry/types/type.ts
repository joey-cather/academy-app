export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  message?: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  content: string;
  createdAt: string;
}
