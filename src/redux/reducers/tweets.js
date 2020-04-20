import { GET_TWEETS, TOGGLE_TWEET_LIKE, ADD_TWEET } from '../actions/tweets'

export default function tweets(state = {}, action) {
  switch (action.type) {
    case GET_TWEETS:
      return {
        ...state,
        ...action.tweets,
      }
    case TOGGLE_TWEET_LIKE:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          likes:
            action.payload.hasLiked === true
              ? state[action.payload.id].likes.filter(
                  (uid) => uid !== action.payload.authedUser,
                )
              : state[action.payload.id].likes.concat(
                  action.payload.authedUser,
                ),
        },
      }
    case ADD_TWEET:
      const { tweet } = action.payload

      let replyingTo = {}

      if (action.payload.tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id]),
          },
        }
      }

      return {
        ...state,
        [action.payload.tweet.id]: action.payload.tweet,
        ...replyingTo,
      }
    // case ADD_TWEET:
    //   const { tweet } = action.payload

    //   let replyingTo = {}
    //   if (action.payload.tweet.replyingTo !== null) {
    //     const allReplies = state[tweet.replyingTo].replies.concat([tweet.id])

    //     return {
    //       ...state,
    //       [action.payload.tweet.id]: action.tweet,
    //       [action.payload.tweet.replyingTo.replies]: allReplies,
    //     }
    //   }

    //   return {
    //     ...state,
    //     [action.tweet.id]: action.tweet,
    //     ...replyingTo,
    //   }
    default:
      return state
  }
}
