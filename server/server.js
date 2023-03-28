const express = require('express');
const app = express();

app.get('/test', (req, res) => {
    res.status(200).json({data: "test"})
  });
  
  app.listen(4000, () => {
    console.log('Server started on port 4000');
  });
  