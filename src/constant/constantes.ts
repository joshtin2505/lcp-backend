export enum roles {
  client = 'client',
  masterAdmin = 'masterAdmin',
  admin = 'admin'
}
export enum userErrors {
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  USER_UNAUTHORIZED = 'USER_UNAUTHORIZED',
  ERROR_TO_CREATE_USER = 'ERROR_TO_CREATE_USER'
}
export enum userSuccess {
  USER_CREATED = 'USER_CREATED',
  USER_DELETED = 'USER_DELETED',
  USER_UPDATED = 'USER_UPDATED',
  USER_FOUND = 'USER_FOUND',
  USER_LOGGED = 'USER_LOGGED',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_VERIFIED = 'USER_VERIFIED'
}
export enum tokenErrors {
  TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  TOKEN_NOT_CREATED = 'TOKEN_NOT_CREATED',
  TOKEN_NOT_VERIFIED = 'TOKEN_NOT_VERIFIED'
}
export enum dataBaseErrors {
  DATABASE_ERROR = 'DATABASE_ERROR',
  DATABASE_QUERY_ERROR = 'DATABASE_QUERY_ERROR',
  DATABASE_NOT_FOUND = 'DATABASE_NOT_FOUND',
  DATABASE_DUPLICATE = 'DATABASE_DUPLICATE',
  users_role_check = 'users_role_check'
}
