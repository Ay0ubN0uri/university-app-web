export type Role = { id: number; name: string };

export type Filiere = {
  id: number;
  code?: string;
  name?: string;
};
export type User = {
  id: number;
  login: string;
  password: string;
  roles: Role[];
};

export type Student = User & {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  filiere: Filiere;
};
