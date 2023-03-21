const express = require('express');
const rateLimit = require('express-rate-limit');
const fallback = require('express-history-api-fallback');
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

const HOST = 'ya-praktikum.tech';
const API = `https://${HOST}/api/v2/`;
const WEBSOCKET = `wss://${HOST}/ws/chats/`;

const app = express();
const PORT = process.env.PORT || 3000;
const DIR = `${__dirname}/dist`;
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(expressCspHeader({
    directives: {
        'default-src': [SELF],
        'connect-src': [API, WEBSOCKET],
        'script-src': [SELF, INLINE],
        'style-src': [SELF],
        'img-src': [SELF, API],
        'worker-src': [NONE],
        'block-all-mixed-content': true
    }
}));

app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

app.use(express.static(`${DIR}/`), apiLimiter);
app.use(fallback('index.html', { root: DIR }))

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});
