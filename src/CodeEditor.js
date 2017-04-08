import React, { Component } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/solarized_dark'
import 'brace/ext/language_tools'
import 'brace/keybinding/vim'


export default class CodeEditor extends Component {
  reloadProps() {
    this.setState({
      value: 'I am changed',
    });
  }

  render() {
    return (
      <AceEditor
        mode="javascript"
        theme="solarized_dark"
        keyboardHandler="vim"
        height="8em"
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          tabSize: 4,
          fontSize: 14,
        }}
        maxLines="14"
        minLines="14"
        value={ this.props.initialcode }
      />
    );
  }
}
