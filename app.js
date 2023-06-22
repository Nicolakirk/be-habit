const express = require("express");
const { getTopics } = require("./controllers/topic.controllers");
const { badRoute, handleCustomErrors, handlePSQL400s, handle500Statuses } = require("./controllers/error_controllers");
const { getFrequency } = require("./controllers/frequency.controllers");
const { postHabits, patchDaysforHabits, getHabitsById, getHabitsByOwner, getHabits, deleteComments, deleteHabits } = require("./controllers/habits.controllers");


const cors = require('cors');
const app = express();
app.use(express.json());



app.get('/api/topics', getTopics);
app.get('/api/frequency', getFrequency);
app.post('/api/:owner/habits',postHabits )
app.patch('/api/habits/:habit_id', patchDaysforHabits)
app.get('/api/habits', getHabits)
app.get('/api/owner/habits/:owner', getHabitsByOwner)
app.delete('/api/habits/:habit_id', deleteHabits)

app.use(badRoute);
app.use(handleCustomErrors);
app.use(handlePSQL400s);
app.use(handle500Statuses);

module.exports = app;
