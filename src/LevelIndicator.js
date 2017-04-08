import React, { Component } from 'react'
import { Pagination } from 'antd';

function onChange(pageNumber) {
  console.log('Page: ', pageNumber);
}

export default class LevelIndicator extends Component {
  render() {
    return (
      <Pagination showQuickJumper defaultCurrent={1} pageSize={1} total={7} onChange={onChange} />
    );
  }
}
