type Id = number
type Names = `${string} ${string}` | string
type Email = `${string}@${string}.${string}`
type Role = 'masterAdmin' | 'admin' | 'user'
type PhonePrefix = `+${number}`
type Langs = 'en' | 'es' | 'fr'
type Themes = 'dark' | 'light' | 'system'
interface User {
  name: Names
  lastName: Names
  email: Email
  password: string
  role: Role
  phone: number
  phonePrefix: PhonePrefix
  preferens: {
    language: Langs
    theme: Themes
  }
}
export type { Id, User, Names, Email, Role, PhonePrefix, Langs, Themes }
