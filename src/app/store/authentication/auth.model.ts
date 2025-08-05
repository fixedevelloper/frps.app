export class User {
  id?: string | number
  username?: string
  email?: string
  phone?: string
  password?: string
  firstName?: string
  lastName?: string
  role?: 'admin' | 'user'
  token?: string
}
