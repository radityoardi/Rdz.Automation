const express = require("express");
const serverless = require("serverless-http");

var bodyParser = require('body-parser')
const app = express();
const router = express.Router();

app.use(bodyParser.json());

router.get('/js-regex-replace', (req, res) => {
    const { pattern, flags, input, replacement } = req.body;
    if (pattern && input && replacement) {
        const re = new RegExp(pattern, flags ?? "g");
        res.json({
            "original": {
                "pattern": pattern,
                "flags": flags,
                "input": input,
                "replacement": replacement
            },
            "value": input.replace(re, replacement)
        });
        /*
        if (input.match(re)) {
        } else {
            res.status(400).send("there is no string to match.");
        }
        */
    } else {
        res.status(400).send("pattern, input and replacement is required.");
    }
});


app.use(`/.netlify/functions/api`, router);


module.exports = app;
module.exports.handler = serverless(app);
