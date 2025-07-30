require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');

const paymentRoute = require('./routes/payment')
const port = 4000

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE).then(() => console.log("MongoDB connected successfully")).catch(() => console.log("Error while connecting MongoDB"))
app.use('/api', paymentRoute);

app.listen(port, () => console.log(`App is running on port ${port}`))