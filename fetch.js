//https://docs.google.com/spreadsheets/d/15bliX7-RAnNjRahe10uS-PaW7QHXJMqvdZ5e0qZI2q4
const fetchJson = require('node-fetch-json');
const GoogleSpreadsheet = require('google-spreadsheet');
const url =       'http://traffic.ottawa.ca/map/parking_list?updateOnly';
const creds = require('./client_secret.json');

const d = new Date(new Date() - 4*60*60*1000);
const now = d.getFullYear() + "-" +
    ("00" + (d.getMonth() + 1)).slice(-2) + "-" +
    ("00" + d.getDate()).slice(-2) +
    (" ")+
    ("00" + d.getHours()).slice(-2) + ":" +
    ("00" + d.getMinutes()).slice(-2) + ":" +
    ("00" + d.getSeconds()).slice(-2);



function handleData(data) {
   console.log('Success!');

   doc.addRow(1, { date: now,
       gloucester25: data.filter(obj => {return obj.id == 25})[0].freeSpaces,
       clarence26: data.filter(obj => {return obj.id == 26})[0].freeSpaces,
       clarence27: data.filter(obj => {return obj.id == 27})[0].freeSpaces,
       laurier28: data.filter(obj => {return obj.id == 28})[0].freeSpaces,
       second29: data.filter(obj => {return obj.id == 29})[0].freeSpaces,
     }, function(err) {
     if(err) {
       console.log(err);
     }
  });

 }


// Create a document object using the ID of the spreadsheet - obtained from its URL.
const doc = new GoogleSpreadsheet('15bliX7-RAnNjRahe10uS-PaW7QHXJMqvdZ5e0qZI2q4');

// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {

  fetchJson.get(url).then(handleData);


});
