import { saveLikeToggle, saveTweet } from '../../utils/api'

import { showLoading, hideLoading } from 'react-redux-loading'

export const GET_TWEETS = 'GET_TWEETS'
export const TOGGLE_TWEET_LIKE = 'TOGGLE_TWEET_LIKE'
export const ADD_TWEET = 'ADD_TWEET'

export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveTweet({
      text,
      author: authedUser,
      replyingTo,
    })
      .then((tweet) => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()))
  }
}

function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    payload: {
      tweet,
    },
  }
}

export function handleGetTweets(tweets) {
  return {
    type: GET_TWEETS,
    tweets,
  }
}

function ToggleLike({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET_LIKE,
    payload: {
      id,
      authedUser,
      hasLiked,
    },
  }
}

export function handleToggleTweetLike(info) {
  return (dispatch) => {
    dispatch(ToggleLike(info))

    return saveLikeToggle(info).catch((error) => {
      console.warn('An error occurred', error)
      dispatch(ToggleLike(info))
      alert('There was an error liking your tweet, Please try again!')
    })
  }
}
