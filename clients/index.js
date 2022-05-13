require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const clientsRouter = require('./routes/clients');


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to db'));

app.use(express.json());

app.use('/clients', clientsRouter);

app.listen(3000, () => console.log('listening on port 3000'));