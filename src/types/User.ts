interface IUser {
  id: number;
  username: string;
  email: string;
  roles: Role[];
}

interface Role {
  id: number;
  role: string;
  valueRole: string | null;
}

export type { IUser, Role };
