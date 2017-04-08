import React, { Component } from 'react'
import './App.css'
import Play from './Play'
import Preview from './Preview'
import CodeEditor from './CodeEditor'
import levels from './levels/levels.js'

class App extends Component {
  state = {
    playing: false,
    level: 1
  }

  play = () => this.setState({ playing: true })

  render() {
    const { playing, level, code } = this.state
    const description = '<p>'+levels[level].instructions.join('</p><p>')+'</p>'

    return (
      <div className="App">
        <div className="Left-sidebar">
          <div className="Game-description" dangerouslySetInnerHTML={{ __html: description }}>
          </div>
          <CodeEditor />
        </div>
        <div className="Right-sidebar">
          {playing
            ? <Play {...{level, code}} />
            : <Preview {...{level, code}} />
          }
        </div>
      </div>
    );
  }
}

export default App;
