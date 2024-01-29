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

app.get('/altin', async (req, res) => {
    var results = [];
    try {
        const url = "https://altin.doviz.com/gram-altin";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        $("body > div.wrapper > div.kur-page > div.article-content > div.value-table > div > table > tbody > tr").each((index, element) => {
            var name = $(element).find("td:nth-child(1)").text();
            var buy = $(element).find("td:nth-child(2)").text();
            var sell = $(element).find("td:nth-child(3)").text();
            if (name.trim()) {
                results.push({
                    name: name.trim(),
                    buy: buy.trim(),
                    sell: sell.trim()
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

app.get('/gumus', async (req, res) => {
    var results = [];
    try {
        const url = "https://altin.doviz.com/gumus";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        $("body > div.wrapper > div.kur-page > div.article-content > div.value-table > div > table > tbody > tr").each((index, element) => {
            var name = $(element).find("td:nth-child(1)").text();
            var buy = $(element).find("td:nth-child(2)").text();
            var sell = $(element).find("td:nth-child(3)").text();
            var m = $(element).find("td:nth-child(4)").text();
            var m2 = $(element).find("td:nth-child(5)").text();
            if (name.trim()) {
                results.push({
                    name: name.trim(),
                    buy: buy.trim(),
                    sell: sell.trim(),
                    m: m.trim(),
                    m2: m2.trim(),
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