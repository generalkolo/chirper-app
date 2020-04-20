export const GET_USERS = 'GET_USERS'

export function handleGetUsers(users) {
  return {
    type: GET_USERS,
    users,
  }
}
