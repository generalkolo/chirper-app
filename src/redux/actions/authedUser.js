export const SAVE_AUTH_USER = 'SAVE_AUTH_USER'

export function saveAuthUser(id) {
  return {
    type: SAVE_AUTH_USER,
    id,
  }
}
