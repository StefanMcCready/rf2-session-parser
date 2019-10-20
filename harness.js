fs = require('fs');
const parseResults = require('./src/index');

fetchData = async () => {
  fs.readFile('./mocks/quali-example.xml', (err, data) => {
    const parsedData = parseResults(data);
    console.log(parsedData);
  });
};

fetchData();