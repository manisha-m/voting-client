var express = require('express');

var path = require('path');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist'));
app.get('*', function response(req, res) {
	console.log("Servicing request... from " + path.join(__dirname, 'dist/index.html'));  
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, function () {
	console.log('Server running on port ' + port);
});
