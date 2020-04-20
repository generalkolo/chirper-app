import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { handleAddTweet } from '../redux/actions/tweets'

class NewTweet extends Component {
  state = {
    text: '',
    toHome: false,
  }

  handleTextChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { text } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddTweet(text, id))

    this.setState(() => ({
      text: '',
      toHome: id ? false : true,
    }))
  }

  render() {
    const { text, toHome } = this.state
    const textLength = 280 - text.length

    if (toHome === true) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h3 className="center">Compose Tweet</h3>
        <form onSubmit={this.handleSubmit} className="new-tweet">
          <textarea
            className="textarea"
            maxLength={280}
            placeholder="Whats on your mind?"
            value={text}
            onChange={this.handleTextChange}
          ></textarea>
          {textLength <= 100 && (
            <div className="tweet-length">{textLength}</div>
          )}
          <button className="btn" type="submit" disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTweet)
