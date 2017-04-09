import React, { Component } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/solarized_light'
import 'brace/ext/language_tools'

export default class CodeEditor extends Component {
  state = {
    value: ''
  }

  componentWillMount () {
    this.state.value = this.props.initialCode
  }

  componentWillReceiveProps() {
    debugger
    if (this.props.failed || this.props.playing) {
    } else {
      this.state.value = this.props.initialCode
    }
  }

  getContents = () => this.state.value

  reloadProps = (code) => {
    this.setState({
      value: code || this.props.initialCode,
    })
  }

  handleChange = (value) => this.setState({ value })

  render() {

    return (
      <AceEditor
        mode="javascript"
        theme="solarized_light"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          tabSize: 4,
          fontSize: 16,
        }}
        value={this.state.value}
        onChange={this.handleChange}
        height="50%"
        width="100%"
        style={this.props.style}
      />
    );
  }
}
