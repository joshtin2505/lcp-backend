import type { roles } from '../constant/constantes'
import type { Request } from 'express'

type Id = number
type Names = `${string} ${string}` | string
type Email = `${string}@${string}.${string}`
type OrdinalRole = roles.user
type SuperRole = roles.masterAdmin | roles.admin
type Roles = OrdinalRole | SuperRole
type PhonePrefix = `+${number}`
type Langs = 'en' | 'es' | 'fr'
type Themes = 'dark' | 'light' | 'system'
interface User {
  user_id?: Id
  name: Names
  last_name?: Names
  email: Email
  password: string
  role: Roles
  phone?: number
  phone_prefix?: PhonePrefix
  preferens?: {
    language: Langs
    theme: Themes
  }
}
interface RequestLoginType {
  email: Email
  password: string
}
type Users = User[]
interface userToken {
  id: Id
  role: Roles
}
interface userDecodetToken {
  payload: userToken
  iat: number
  exp: number
}
interface ExtendedRequest extends Request {
  user?: userToken
}

export type {
  Id,
  User,
  Names,
  Email,
  OrdinalRole,
  PhonePrefix,
  Langs,
  Themes,
  Users,
  SuperRole,
  RequestLoginType,
  userToken,
  ExtendedRequest,
  userDecodetToken
}
