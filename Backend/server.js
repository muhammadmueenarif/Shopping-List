const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/Users');
const cors = require('cors');

const app = express(); //initialize app
const port = 5000; // You can choose any port you prefer

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true }));



// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Backend!');
});

//user routes always use after initializing the app
app.use('/api/users', userRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
