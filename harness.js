fs = require('fs');
const parseResults = require('./src/index.js');

fetchData = async () => {
  fs.readFile('./mocks/race-example.xml', (err, data) => {
    const parsedData = parseResults(data);
    console.log(parsedData);
  });
};

fetchData();