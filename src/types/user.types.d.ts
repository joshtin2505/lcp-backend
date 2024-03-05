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
  userId?: Id
  name: Names
  lastName: Names
  email: Email
  password: string
  role: OrdinalRole | SuperRole
  phone?: number
  phonePrefix?: PhonePrefix
  preferens?: {
    language: Langs
    theme: Themes
  }
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
  SuperRole
}
