const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

const userRoutes = require("./route/userRoutes")
const dataRoutes = require("./route/dataRoutes");
const validateToken = require('./middleware/validateToken');

app.use('/api/users',userRoutes);
app.use("/api/data",validateToken, dataRoutes )

app.get('/', (req, res)=>{
  return res.send("Welcome to Billeasy Test API!")
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
