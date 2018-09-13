# A Simple Chat App With React, Node and WebSockets

## Step 1: Prepare The Backend

Create a simple WebSocket server that broadcasts all incoming messages to everyone that's connected. So in your project's root directory run the following commands:

    mkdir backend
    cd backend
    yarn add ws
    
Then we will also need an a `server.js`:

    const WebSocket = require('ws');

    const wss = new WebSocket.Server({ port: 3030 });

    wss.broadcast = function broadcast(data) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    };

    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
      });
    });
    
## Step 2: Add The Frontend

Optional - if you haven't already: Install CRA `yarn global add create-react-app`

Then back in your project root: 

    create-react-app frontend
    cd frontend
    yarn add prop-types
    
Create `ChatMessage.js` component. This determines how each single chat message will look like:

    import React from 'react'

    export default ({ name, message }) =>
      <p>
        <strong>{name}</strong> <em>{message}</em>
      </p>
      
Create `ChatInput.js` component. We will display it on top of the chat to enter new messages:

    import React, { Component } from 'react'
    import PropTypes from 'prop-types'

    class ChatInput extends Component {
      static propTypes = {
        onSubmitMessage: PropTypes.func.isRequired,
      }
      state = {
        message: '',
      }

      render() {
        return (
          <form
            action="."
            onSubmit={e => {
              e.preventDefault()
              this.props.onSubmitMessage(this.state.message)
            }}
          >
            <input
              type="text"
              placeholder={'Enter message...'}
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
            />
            <input type="submit" value={'Send'} />
          </form>
        )
      }
    }

    export default ChatInput
    
Create `Chat.js` component, which will be the center of our chat logic. It holds our state, manage the connection and also send and receive the messages:

    import React, { Component } from 'react'
    import ChatInput from './ChatInput'
    import ChatMessage from './ChatMessage'

    const URL = 'ws://localhost:3030'

    class Chat extends Component {
      state = {
        name: 'Bob',
        messages: [],
        ws: new WebSocket(URL),
      }

      componentDidMount() {
        this.state.ws.onopen = () => {
          // on connecting, do nothing but log it to the console
          console.log('connected')
        }

        this.state.ws.onmessage = evt => {
          // on receiving a message, add it to the list of messages
          const message = JSON.parse(evt.data)
          this.addMessage(message)
        }

        this.state.ws.onclose = () => {
          console.log('disconnected')
          // automatically try to reconnect on connection loss
          this.setState({
            ws: new WebSocket(URL),
          })
        }
      }

      addMessage = message =>
        this.setState(state => ({ messages: [message, ...state.messages] }))

      submitMessage = messageString => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = { name: this.state.name, message: messageString }
        this.state.ws.send(JSON.stringify(message))
        this.addMessage(message)
        this.setState({ message: '' })
      }

      render() {
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
              ws={this.state.ws}
              onSubmitMessage={messageString => this.submitMessage(messageString)}
            />
            {this.state.messages.map((message, index) =>
              <ChatMessage
                key={index}
                message={message.message}
                name={message.name}
              />,
            )}
          </div>
        )
      }
    }

    export default Chat
    
Update your `App.js` to include the Chat component.

    import React, { Component } from 'react'
    import logo from './logo.svg'
    import './App.css'
    import Chat from './Chat'

    class App extends Component {
      render() {
        return (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <Chat />
          </div>
        )
      }
    }

    export default App
    
## Step 3: Try It Out!

Start your servers by running `yarn start` in the `frontend/` directory and `node app.js` in the `backend/` directory and point your browser to `localhost:3000` 
Open a second browser tab and enter a different name and try to send messages back and forth.
Congrats, you've created your first chat room :)

## Step 4: Clone And Extend
If you want to dive into the full code example you can clone it here and play around with it: https://github.com/bitlabstudio/blogpost-react-websocket-chat