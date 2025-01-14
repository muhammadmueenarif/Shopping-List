const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/Users');
const cors = require('cors');
const { validateToken } = require('./Controllers/UserControllers');  // Import validateToken function

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

app.post('/auth/validateToken', validateToken);  // Define the route for token validation

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
