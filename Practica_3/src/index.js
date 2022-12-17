const express = require('express');
const app = express();
const path = require('path');


app.set('port', 3000);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});
