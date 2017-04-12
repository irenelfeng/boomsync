import React, { Component } from 'react'
import { Pagination } from 'antd';


export default class LevelIndicator extends Component {

  handleChange = (page, pageSize) => {
    this.props.changePage(page)
  }

  render() {
    return (
      <Pagination simple defaultCurrent={this.props.level} total={80} onChange={this.handleChange} />
    );
  }
}
