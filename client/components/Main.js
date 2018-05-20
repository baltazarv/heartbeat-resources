import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// const { google } = require('googleapis');

class Main extends Component {
  constructor() {
    super();
    this.onGetData = this.onGetData.bind(this);
  }
  onGetData(ev) {
    console.log('get data');

  }
  render() {
    return (
      <_Main onGetData={ this.onGetData }/>
    )
  }
}

const _Main = ({ onGetData }) => {
  return (
    <div>
      <p><button type="button" onClick={ onGetData }>Get Data</button></p>
      <div></div>
    </div>
  );
};

export default Main;
