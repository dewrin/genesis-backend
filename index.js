const express = require('express');
const fs = require('fs');

const app = express();

// Endpoint untuk mendapatkan data dari file JSON
app.get('/api/massa/:address', (req, res) => {
  const { address } = req.params;
  console.log(address);
  fs.readFile('massa.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const result = jsonData[address];
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

// Atur port server
const PORT = process.env.PORT || 1501;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
