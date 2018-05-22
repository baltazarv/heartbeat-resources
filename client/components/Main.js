import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { load } from '../spreadsheet';
// const { google } = require('googleapis');

class Main extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null
    };
    this.onLoad = this.onLoad.bind(this);
    this.initClient = this.initClient.bind(this);
  }
  componentDidMount() {
    window.gapi.load('client', this.initClient);
  }
  initClient() {
    // const { GOOGLE_API_KEY, DISCOVERY_DOCS } = process.env;
    // if (!GOOGLE_API_KEY || !DISCOVERY_DOCS) {
    //   throw 'setup up GOOGLE_API_KEY and DISCOVERY_DOCS!'
    // }
    // Initialize the JavaScript client library.
    window.gapi.client
      .init({
        apiKey: 'AIzaSyD5QRvzQfpKX5iON4koXO2RH5e1zvLhCK8',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
      })
      .then(() => {
      // Initialize and make the API request.
      load(this.onLoad);
    });
  }
  onLoad(data, error) {
    if (data) {
      // const cars = data.cars;
      // console.log('data', data.resources);
      this.setState({ data: data.resources });
    } else {
      console.log('error', error);
      this.setState({ error });
    }
  }
  // onGetData(ev) {
  //   console.log('get data');
  // }
  render() {
    const { data } = this.state;
    return (
      <div className="container mt-2">
        <h1>Resource Sheet</h1>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Department</th>
            <th scope="col">Client</th>
            <th scope="col">Type</th>
            <th scope="col">Project</th>
            <th scope="col">Producer</th>
            <th scope="col">Resource</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
        {
          data && data.map((_data, i) => {
            return (
              <tr key={ i }>
                <th scope="row">{ i }</th>
                <td>{ _data.dept }</td>
                <td>{ _data.client }</td>
                <td>{ _data.type }</td>
                <td>xxx</td>
                <td>{ _data.producer }</td>
                <td>{ _data.resource }</td>
                <td><button type="button" className="btn btn-primary btn-sm mr-3">edit</button><button type="button" className="btn btn-danger btn-sm">x</button></td>
              </tr>
            );
          })
        }
        </tbody>
      </table>
    </div>
    );
  }
}

// const _Main = ({ data }) => {
//   return (
//   );
// };

// <p><button type="button" onClick={ onGetData }>Get Data</button></p>

export default Main;
