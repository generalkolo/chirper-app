import { getInitialData } from '../../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

import { handleGetTweets } from './tweets'
import { handleGetUsers } from './users'
import { saveAuthUser } from './authedUser'

const AUTH_USER_ID = 'tylermcginnis'

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData().then(({ users, tweets }) => {
      dispatch(handleGetTweets(tweets))
      dispatch(handleGetUsers(users))
      dispatch(saveAuthUser(AUTH_USER_ID))
      dispatch(hideLoading())
    })
  }
}
