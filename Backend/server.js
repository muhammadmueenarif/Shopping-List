const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/Users');
const { admin, db } = require('./firebaseConfig');

const app = express(); //initialize app
const port = 5000; // You can choose any port you prefer

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//user routes always use after initializing the app
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Backend!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
