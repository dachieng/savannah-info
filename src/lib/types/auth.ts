export type JWTPayload = {
  sub: string;
  email: string;
  name?: string;
};

export interface IUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}
