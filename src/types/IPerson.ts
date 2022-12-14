import { EDepartment } from "./Department";

export interface IPerson {
  id: string,
  avatarUrl: string,
  firstName: string,
  lastName: string,
  userTag: string,
  department: EDepartment,
  position: string,
  birthday: Date,
  phone: string,
}
