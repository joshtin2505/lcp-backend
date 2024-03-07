import type { roles } from '../constant/constantes'

type Id = number
type Names = `${string} ${string}` | string
type Email = `${string}@${string}.${string}`
type OrdinalRole = roles.user
type SuperRole = roles.masterAdmin | roles.admin
type PhonePrefix = `+${number}`
type Langs = 'en' | 'es' | 'fr'
type Themes = 'dark' | 'light' | 'system'
interface User {
  user_id?: Id
  name: Names
  last_name: Names
  email: Email
  password: string
  role: OrdinalRole | SuperRole
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
  RequestLoginType
}
