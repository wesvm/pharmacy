type LoginResponse = {
  user: User;
  token: string;
  message?: string;
}

type ApiResonse = {
  error?: string;
  message?: string;
}

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
}

type Role = {
  id: number;
  name: string;
}