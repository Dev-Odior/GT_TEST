export enum Role {
  Admin = 'admin',
  Manager = 'manager',
  User = 'user',
}

export interface UserAttributeI {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
  isVerified: boolean;
}
