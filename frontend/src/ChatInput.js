import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class ChatInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      message: '',
    }

    this.letSubmitMessage=this.letSubmitMessage.bind(this)

  }

 
  letSubmitMessage (e) {
    e.preventDefault()
    this.props.onSubmitMessage(this.state.name,this.state.message)
    this.setState({ 
                    name:'',
                    message: '' 
                  })
  }

  render(props) {
    console.log('what props==>',this.props)
    console.log('what state=>',this.state)
    const {name,message}=this.state
    console.log('message input=>',message)    
    return (
     <div>
      <form
        action="."
        onSubmit={
          this.letSubmitMessage
         }
      >
      <input
        type="text"
        placeholder={'Enter your name...'}
        value={this.state.name}
        onChange={e => this.setState({ name: e.target.value })}
      />
        <input
          type="text"
          placeholder={'Enter message...'}
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />
      <div>Word-Count: {}</div>
        <input type="submit"  />
      </form>
     </div>
    )
  }
}

export default ChatInput
