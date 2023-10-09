
export type UserTypes = {
  accessToken?: string;
  refreshToken?: string;
  isLoading?: string;
  user: {
    avatar: string | null;
    username: string;
    email: string;
    phone: string;
    password?: string;
    oldpass?: string;
    newpass?: string;
    confirmpass?: string;
    isActivated?: boolean;
    admin?: boolean;
    id?: string;
  }
};

export type MainUserTypes = {
  username?: string;
  phone: string;
  email: string;
  password: string;
};

export type AdminTypes = {
  username: string;
  email: string | undefined;
  admin?: boolean;
  id: string | null | undefined;
};

export interface ProductType {
  id?: string,
  productId: number,
  type: string,
  desc: string,
  img: string,
  newprice: number,
  count: number
}

export interface ProductCardType {
  Ratings: number[],
  collection: string,
  createdAt: string
  desc: string,
  id: number,
  img: string,
  label: string
  newprice: number,
  oldprice: number,
  rating: number,
  type: string,
  updatedAt: string
}

export interface UserOrder {
  userId: string,
  email: string,
  phone: string,
  userCart: string,
  amount: number,
  totalsum: number
}


export interface UpdateTypes {
  id: string | undefined,
  username: FormDataEntryValue,
  email: FormDataEntryValue,
  phone: FormDataEntryValue,
  oldpass: FormDataEntryValue,
  newpass: FormDataEntryValue,
  confirmpass: FormDataEntryValue,
}

