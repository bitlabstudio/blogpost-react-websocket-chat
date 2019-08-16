import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Chat from './Chat'

class App extends Component {
  state = {
    room: "Dan's React Chat",
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
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
        <Chat room={this.state.room} />
      </div>
    )
  }
}

export default App
