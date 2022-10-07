import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const URL = 'wss://tso-take-home-chat-room.herokuapp.com'

class Chat extends Component {
  state = {
    name: '',
    messages: [],
   
  }

  ws = new WebSocket(URL)
  componentDidMount() {
    this.ws.onopen = () => {
    console.log('this.ws=>',this.ws) 
      // on connecting, do nothing but log it to the console
      console.log('let us connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const eachMessage=evt.data
      console.log('this is eachMessage==>',eachMessage)
      console.log('this is user name in socket=>',eachMessage.substring(0, eachMessage.indexOf(':')))
      console.log('this is user Message socket-->',eachMessage.substring(eachMessage.indexOf(':')+2))
      this.addMessage(eachMessage)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  addMessage =(newMessage) =>{
    console.log('add newMessage=>',newMessage);
    this.setState(state => ({ messages: [...state.messages,newMessage] }))
  }
  submitMessage = messageString => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message=`${this.state.name}:${messageString}`
    console.log('sumbit Message message variable=>',message)
    this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {
    console.log('list of name===>',this.state.name)
    console.log('list of messages===>',this.state.messages)
    return (
      <div>
        <label htmlFor="name">
          Name:&nbsp;
          <input
            type="text"
            id={'name'}
            placeholder={'Enter your name...'}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        </label>
        <ChatInput
          ws={this.ws}
          onSubmitMessage={messageString => this.submitMessage(messageString)}
        />
        {this.state.messages.sort((a,b)=>{ return(
(b.substring(b.indexOf(':')+1).split(' ').length-1)-(a.substring(a.indexOf(':')+1).split(' ').length-1)

)
  
})
        
        
        
        
        .map((message, index) =>
          <ChatMessage
            key={index}
            message={message}
            // message={message.message}
            // name={message.name}
          />,
        )}
      </div>
    )
  }
}

export default Chat
