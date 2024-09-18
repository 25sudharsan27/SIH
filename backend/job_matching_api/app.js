const express = require('express');
const mongoose = require('mongoose');
const jobRoutes = require('./routes/jobRoutes');
const dbConfig = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;


dbConfig();

app.use(express.json());


app.use('/api/jobs', jobRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
