export interface IUser {
  _id?: string;
  userId?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: "user" | "admin";
  iat?: number;
  exp?: number;
}

export interface IUserDeatails {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photo: string;
  role: "user" | "admin";
  status: "active" | "inactive";
  isBan: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
