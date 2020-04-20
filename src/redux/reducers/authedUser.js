import { SAVE_AUTH_USER } from '../actions/authedUser'

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SAVE_AUTH_USER:
      return action.id
    default:
      return state
  }
}
