import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Chat from './Chat'

const URL = 'ws://localhost:3030'

class App extends Component {
  state = {
    room: "Dan's React Chat",
    name: 'Bob',
    connected: false,
    rooms: [],
  }
  ws = new WebSocket(`${URL}?info=1`)

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      this.setState({ rooms: message.rooms })
    }

    this.ws.onclose = () => {
      console.log('disconnected')
    }
  }

  componentWillUnmount() {
    this.ws.close()
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {!this.state.connected && (
          <React.Fragment>
            <h2>Select a room</h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {this.state.rooms.map(room => (
                <button
                  key={room}
                  style={{ display: 'flex' }}
                  onClick={() => this.setState({ connected: true, room })}
                >
                  {room}
                </button>
              ))}
              {this.state.rooms.length === 0 && (
                <p>No rooms registered. Connect to a room to get started.</p>
              )}
            </div>
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
            <label htmlFor="room">
              Room:&nbsp;
              <input
                type="text"
                id={'room'}
                placeholder={'Enter room...'}
                value={this.state.room}
                onChange={e => this.setState({ room: e.target.value })}
              />
            </label>
            <button onClick={() => this.setState({ connected: true })}>
              Connect
            </button>
          </React.Fragment>
        )}
        {this.state.connected && (
          <React.Fragment>
            <button onClick={() => this.setState({ connected: false })}>
              Disconnect from "{this.state.room}"
            </button>
            <Chat
              room={this.state.room}
              name={this.state.name}
              onDisconnect={() => this.setState({ connected: false })}
            />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default App
