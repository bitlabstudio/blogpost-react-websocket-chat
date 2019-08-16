import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Chat from './Chat'

class App extends Component {
  state = {
    room: "Dan's React Chat",
    connected: false,
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
            <Chat room={this.state.room} />
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default App
