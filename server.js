const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const DIR = `${__dirname}/dist`;

app.use(express.static(`${DIR}/`));
app.use('/login', express.static(`${DIR}/login.html`));
app.use('/messenger', express.static(`${DIR}/messenger.html`));
app.use('/profile', express.static(`${DIR}/profile.html`));
app.use('/profile-change', express.static(`${DIR}/profile-change.html`));
app.use('/profile-change-password', express.static(`${DIR}/profile-change-password.html`));
app.use('/404', express.static(`${DIR}/404.html`));
app.use('/500', express.static(`${DIR}/500.html`));

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});
