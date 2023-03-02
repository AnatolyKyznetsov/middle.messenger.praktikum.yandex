const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const DIR = `${__dirname}/dist`;

app.use(express.static(`${DIR}/`));

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});
