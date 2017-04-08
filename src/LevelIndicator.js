import React, { Component } from 'react'
import { Pagination } from 'antd';


export default class LevelIndicator extends Component {

  handleChange = (page, pageSize) => {
    this.props.changePage(page)
  }

  render() {
    return (
      <Pagination current={this.props.level} pageSize={1} total={5} onChange={this.handleChange} />
    );
  }
}
