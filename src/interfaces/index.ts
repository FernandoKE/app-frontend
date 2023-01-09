export interface Role {
  id: number
  name: string
  isActive: boolean
}

export interface User {
  id: number
  username: string
  fullname: string
  age: number
  imagePath: string
  isActive: boolean
  roles: Role[]
}

export interface UserEdit {
  username: string
  fullname: string
  password?: string
  isActive?: boolean
  age?: number | null
  image?: File[]
  roleIds?: number[]
}

export interface Token {
  accessToken: string
  tokenType: string
}
