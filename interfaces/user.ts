export interface User extends Record<string, unknown> {
  email: string;
  password: string;
  role: 'ADMIN' | 'REGULAR';
  username: string;
}
