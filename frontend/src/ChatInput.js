import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class ChatInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // name:''
      message: '',
    }

    this.letSubmitMessage=this.letSubmitMessage.bind(this)

  }

 
  letSubmitMessage (e) {
    e.preventDefault()
    this.props.onSubmitMessage(this.state.message)
    this.setState({ message: '' })
  }

  render(props) {
    console.log('what props==>',this.props)
    return (
      <form
        action="."
        onSubmit={
          this.letSubmitMessage
         }
      >
        <input
          type="text"
          placeholder={'Enter message...'}
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
        <input type="submit"  />
      </form>
    )
  }
}

export default ChatInput
