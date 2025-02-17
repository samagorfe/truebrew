const express = require('express');
const connect = require('./db'); // Ensure this is correctly imported

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const db = await connect(); // Connect to MongoDB
    res.send('Welcome to TrueBrew!');
  } catch (error) {
    res.status(500).send('Failed to connect to database');
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  try {
    await connect(); // This ensures connection to MongoDB on server start
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
});

