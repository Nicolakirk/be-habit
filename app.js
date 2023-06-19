const express = require("express");
const { getTopics } = require("./controllers/topic.controllers");
const { badRoute, handleCustomErrors, handlePSQL400s, handle500Statuses } = require("./controllers/error_controllers");
const app = express();


app.use(express.json());



app.get('/api/topics', getTopics);

app.use(badRoute);
app.use(handleCustomErrors);
app.use(handlePSQL400s);
app.use(handle500Statuses);

module.exports = app;
