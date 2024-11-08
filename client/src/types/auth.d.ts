type LoginResponse = {
  user: User;
  token: string;
  message?: string;
}

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
}