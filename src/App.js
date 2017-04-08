import React, { Component } from 'react'
import { Button } from 'antd';
import './App.css'
import Play from './Play'
import Preview from './Preview'
import levels from './levels'
import CodeEditor from './CodeEditor'

export default class App extends Component {
  state = {
    playing: false,
    level: 0,   // this is just an index
    isSubmitted: false,
    failed: null,
    done: false
  }

  handleClick = () => {
    this.setState(prevState => ({
      playing: true,
      isSubmitted: !prevState.isSubmitted
    }))
  }

  succeed = () => {
    this.setState(() => ({
      failed: false,
      done: true
    }));
  }

  failed = (err) => {
    this.setState(() => ({
      failed: err,
      done: true
    }));
  }

  play = () => this.setState({ playing: true })

  render() {
    const { playing, level, code } = this.state
    const description = '<p>'+levels[level].instructions.join('</p><p>')+'</p>'
    const initialcode = levels[level].initialcode

    return (
      <div className="App">
        <div className="Left-sidebar">
          <div className="Game-description" dangerouslySetInnerHTML={{ __html: description }}>
          </div>
          <CodeEditor {...{initialcode}}/>
          <Button type="primary" loading={this.state.playing} onClick={this.handleClick}>
            {this.state.isSubmitted
              ? this.state.playing
                ? 'Running'
                : 'Next'
              : 'Submit'
            }
          </Button>
        </div>
        <div className="Right-sidebar">
          { playing
            ? <Play {...{level: levels[level], code, failed: this.failed, succeed: this.succeed}} />
            : <Preview {...{level}} />
          }
        </div>
      </div>
    );
  }
}
