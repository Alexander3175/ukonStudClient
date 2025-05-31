interface IUser {
  id: number;
  username: string;
  email: string;
  roles: IRole[];
}

interface IUserSteam {
  steamId: string;
  displayName: string;
  photos: { value: string }[];
  country: string;
  lastLogoffAt: string;
}

interface IRole {
  id: number;
  role: string;
  valueRole: string | null;
}

type TWitchUser = IUser | IUserSteam;

export type { IUser, IRole, IUserSteam, TWitchUser };
