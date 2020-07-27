export interface FriendModel {
  id: {
    name: string;
    value: string;
  };
  name: { first: string; last: string; };
  dob: { date: Date; age: number; };
  login: { uuid: string };
  lastName: string;
  phone: string;
}
