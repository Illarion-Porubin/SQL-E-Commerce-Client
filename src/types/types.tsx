
export type UserTypes = {
  accessToken?: string;
  refreshToken?: string;
  isLoading?: string;
  provider?: string;
  user: {
    avatar: string | null;
    username: string;
    email: string;
    phone: string;
    password?: string;
    oldpass?: string;
    newpass?: string;
    confirmpass?: string;
    isActivated: boolean;
    admin?: boolean;
    id: string;
    profileUrl: string;
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

export interface ProductCartType {
  id?: string,
  productId: number,
  type: string,
  desc: string,
  img: string,
  newprice: string,
  count: number
}

export interface ProductForm {
  id?: number,
  CategoryId?: FormDataEntryValue,
  desc: FormDataEntryValue,
  label: FormDataEntryValue,
  img: string,
  newprice: FormDataEntryValue,
  oldprice: FormDataEntryValue
  rating?: FormDataEntryValue
}
export interface ProductType {
  id?: number,
  desc?: string,
  img?: string,
  label?: string
  newprice?: string,
  oldprice?: string,
  rating?: string,
  CategoryId?: number,
}

export interface ProductCardType {
  Ratings: number[],
  collection: string,
  createdAt: string
  desc: string,
  id: number,
  img: string,
  label: string
  newprice: string,
  oldprice: string,
  rating: string,
  type: string,
  count: number,
  CategoryId?: number,
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

export interface Category {
  id: number,
  title: string
}
