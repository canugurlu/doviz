const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cheerio = require('cheerio');
const axios = require("axios");
const cors = require("cors");

app.use(
    express.urlencoded(),
    cors({
        origin: 'http://localhost:3000'
    })
);

server.listen(3000);

app.get('/', async (req, res) => {
    var results = [];
    try {
        const url = "https://altin.doviz.com/odaci";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        $("#golds > tbody > tr").each((index, element) => {
            var name = $(element).find("td:nth-child(1)").text();
            var buy = $(element).find("td:nth-child(2)").text();
            var sell = $(element).find("td:nth-child(3)").text();
            var change = $(element).find("td:nth-child(4)").text();
            if (name.trim()) {
                results.push({
                    name: name.trim(),
                    buy: buy.trim(),
                    sell: sell.trim(),
                    change: change.trim(),
                });
            }

        });

    } catch (err) {
        console.error(err);
    }

    res.json({
        "message": "success",
        "data": results
    })
});