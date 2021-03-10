const express = require('express');
const fs = require('fs');
const parseResults = require('./');
const app = express();

app.get('/trial', async (req, res) => {
	fs.readFile('./practice-example.xml', async (err, data) => {
		const resultsData = await parseResults(data);

		if (resultsData) {
			res.send({ resultsData });
		}
	});
});

app.listen(3000);