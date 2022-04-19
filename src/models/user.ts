type User = {
  id: number
  name: string
  password: string
  email?: string
  partys?: Party[]
}
export default User;