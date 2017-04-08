import React, { Component } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'
import 'brace/ext/language_tools'

export default class CodeEditor extends Component {
  state = {
    value: ''
  }

  componentWillMount () {
    this.state.value = this.props.initialCode
  }

  getContents = () => this.state.value

  reloadProps = () => {
    this.setState({
      value: this.props.initialCode,
    })
  }

  handleChange = (value) => this.setState({ value })

  render() {
    return (
      <AceEditor
        mode="javascript"
        theme="solarized_dark"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          tabSize: 4,
          fontSize: 14,
        }}
        value={this.state.value}
        onChange={this.handleChange}
        height="50%"
        width="100%"
      />
    );
  }
}
