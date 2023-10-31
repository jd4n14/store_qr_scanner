
export interface User {
  _id: string;
  name: string;
  code: string;
  role?: {
    name: string;
  }
}
