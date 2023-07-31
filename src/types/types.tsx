
export type UserTypes = {
  accessToken?: string;
  refreshToken?: string;
  isLoading?: string;
  user: {
    username: string;
    email: string;
    password: string;
    isActivated?: boolean;
    admin?: boolean;
    id?: string;
  }
};

export type MainUserTypes = {
  username?: string;
  email: string;
  password: string;
};

export type AdminTypes = {
  username: string;
  email: string | undefined;
  admin?: boolean;
  id: string | null | undefined;
};