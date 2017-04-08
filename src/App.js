import React, { Component } from 'react'
import './App.css'
import Play from './Play'
import Preview from './Preview'
import CodeEditor from './CodeEditor'

class App extends Component {
  state = {
    playing: false
  }

  play = () => this.setState({playing: true})

  render() {
    const { playing, level, code } = this.state

    return (
      <div className="App">
        <div className="Left-sidebar">
          <p className="Game-description">
            Welcome to <code>boomsync</code>!
          </p>
          <CodeEditor />
        </div>
        <div className="Right-sidebar">
          {playing
            ? <Play {...{level, code}} />
            : <Preview {...{level}} />
          }
        </div>
      </div>
    );
  }
}

export default App;
