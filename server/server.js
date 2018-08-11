const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.join(__dirname, '../public/');

//express middleware to user public path
app.use(express.static(publicPath));


var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started up server on port ${port}`);
});