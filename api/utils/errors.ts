export enum ERRORS {
  notFound = "Request value not found",
  unauthorized = "Unauthorized user",
  serverError = "server error",
  forbidden = "Action is forbidden for user",
  expiredToken = "token has expired",
}
class CustomError extends Error {
  constructor(message: string, status: number) {
    super(message);
    // @ts-ignore
    this.status = status;
  }
}

export const unauthorized = () => {
  return new CustomError(ERRORS.unauthorized, 401);
};

export const expired = () => {
  return new CustomError(ERRORS.expiredToken, 401);
};

export const forbidden = () => {
  return new CustomError(ERRORS.forbidden, 403);
};

export const notFound = () => {
  return new CustomError(ERRORS.notFound, 404);
};

export const serverError = () => {
  return new CustomError(ERRORS.serverError, 500);
};
