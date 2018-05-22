// const { GOOGLE_SHEET_ID } = process.env;
// if (!GOOGLE_SHEET_ID) {
//   throw 'setup up GOOGLE_API_KEY and DISCOVERY_DOCS!'
// }

export function load(callback) {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: '12krUoCYdm54Q0ef5srlzy0LeXp0vHMkhJifys9KEPiQ',
        range: 'RequestSheet!A2:U99'
      })
      .then(
        response => {
          const data = response.result.values;
          const resources = data.map(_data => ({
            dept: _data[0],
            client: 'xxx',
            type: _data[2],
            producer: _data[4],
            resource: _data[5]
          })) || [];
          callback({
            resources
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}

// export function load(callback) {
//   window.gapi.client.load('sheets', 'v4', () => {
//     window.gapi.client.sheets.spreadsheets.values
//       .get({
//         spreadsheetId: '1KTArYwDWrn52fnc7B12KvjRb6nmcEaU6gXYehWfsZSo',
//         range: 'Sheet1!A4:T'
//       })
//       .then(
//         response => {
//           const data = response.result.values;
//           const cars = data.map(car => ({
//             year: car[0],
//             make: car[1],
//             model: car[2]
//           })) || [];
//           callback({
//             cars
//           });
//         },
//         response => {
//           callback(false, response.result.error);
//         }
//       );
//   });
// }
