export enum ERROR_MESSAGES {
  WrongPassword = 'Wrong password',
  EmailNotExists = "User with such email doesn't exist",
  EmailExists = 'User with such email already exists',
  InvalidRT = 'Refresh token is not valid',
  InvalidAT = 'Access token is not valid',
  StripeError = 'Error during creation payment intent',
}
