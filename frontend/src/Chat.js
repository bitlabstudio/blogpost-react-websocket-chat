import React, { Component } from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const URL = 'wss://tso-take-home-chat-room.herokuapp.com'

class Chat extends Component {
  state = {
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
      let userName=eachMessage.substring(0, eachMessage.indexOf(':'));
      console.log('this is user Message socket-->',eachMessage.substring(eachMessage.indexOf(':')+2))
      let userMessage=eachMessage.substring(eachMessage.indexOf(':')+2);
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
  submitMessage = (nameString,messageString) => {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    console.log('nameString SubmitMessage=>',nameString);
    console.log('messageString subtMessage==>',messageString)
    const message=`${nameString}:${messageString}`
    console.log('sumbit Message message variable=>',message)
    // this.ws.send(JSON.stringify(message))
    this.addMessage(message)
  }

  render() {
    console.log('list of messages===>',this.state.messages)
    return (
      <div>
        <ChatInput
          ws={this.ws}
          onSubmitMessage={(nameString,messageString) => this.submitMessage(nameString,messageString)}
        />
        {this.state.messages
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
