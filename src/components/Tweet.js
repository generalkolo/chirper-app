import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  TiArrowBackOutline,
  TiHeartOutline,
  TiHeartFullOutline,
} from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

import { formatTweet, formatDate } from '../utils/helpers'
import { handleToggleTweetLike } from '../redux/actions/tweets'

class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`tweet/${id}`)
  }

  handleLike = (e) => {
    e.preventDefault()

    const { dispatch, tweet, authedUser } = this.props

    dispatch(
      handleToggleTweetLike({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authedUser,
      }),
    )
  }

  render() {
    const { tweet } = this.props

    if (tweet === null) {
      return <p> This Tweet doesn't exist</p>
    }

    const {
      parent,
      timestamp,
      likes,
      avatar,
      text,
      replies,
      hasLiked,
      id,
      name,
    } = tweet

    return (
      <Link to={`/tweet/${id}`} className="tweet">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div className="">{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={(e) => this.toParent(e, parent.id)}
              >
                <p>Replying to @{parent.author}</p>
              </button>
            )}
            <div>{text}</div>
          </div>

          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline className="tweet-icon" color="e0245e" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = ({ authedUser, users, tweets }, { id }) => {
  const tweet = tweets[id]
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null

  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null,
  }
}

export default withRouter(connect(mapStateToProps)(Tweet))
