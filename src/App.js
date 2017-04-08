import React, { Component } from 'react'
import { Button } from 'antd';
import './App.css'
import Play from './Play'
import Preview from './Preview'
import levels from './levels'
import CodeEditor from './CodeEditor'
import LevelIndicator from './LevelIndicator'

export default class App extends Component {
  state = {
    playing: false,
    level: 0,   // this is just an index
    isSubmitted: false,
    failed: null,
    done: false
  }

  handleClick = () => this.state.done
    ? this.setState(prevState => ({
        playing: false,
        isSubmitted: false,
        code: null,
        level: prevState.level++
      }))
    : this.setState(prevState => ({
        playing: true,
        isSubmitted: true,
        code: this.refs.code.getContents()
      }))

  handleResetClick = () => { // TODO
    this.setState(() => ({
      playing: false,
      done: false,
      failed: null
    }))
  }

  succeed = () => {
    this.setState(() => ({
      failed: false,
      done: true,
      playing: false,
    }))
  }

  fail = (err) => {
    console.log(err)

    this.setState(() => ({
      failed: err,
      playing: false
    }))
  }

  play = () => this.setState({ playing: true })

  render() {
    const { playing, level, code } = this.state
    const description = '<p>'+levels[level].instructions.join('</p><p>')+'</p>'
    const initialCode = levels[level].initialCode
    const lineStart = levels[level].lineStart

    return (
      <div className="App">
        <div className="Left-sidebar">
          <LevelIndicator />
          <div className="Game-description" dangerouslySetInnerHTML={{ __html: description }}>
          </div>
          <CodeEditor {...{initialCode, lineStart}} ref='code' />
          <Button type="danger" onClick={this.handleResetClick}>
            Reset
          </Button>
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
            ? <Play {...{level: levels[level], code, fail: this.fail, succeed: this.succeed}} />
            : <Preview {...{level}} />
          }
        </div>
      </div>
    );
  }
}
