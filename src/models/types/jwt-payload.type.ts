export interface IJwtPayload {
  sub: string;
  email: string;
}

export interface IValidateOutcome extends IJwtPayload {
  refreshToken: string;
}
