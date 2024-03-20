export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ISignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  username: string;
  createdAt: string;
  updatedAt: string;
  loginTimes: number;
  email: string;
  isVerified: boolean;
  hasPassword: boolean;
}

export interface UserStatics {
  usersCount: number;
  todayLoginTimes: number;
  last7DaysAvgLoginTimes: number;
}

export interface IResetPasswordFormData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
