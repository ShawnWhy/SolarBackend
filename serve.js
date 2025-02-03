//give me a standard express server
const express = require('express');
const app = express();
const port = 3000;
//serve static files
app.use(express.static('public'));
//start the server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
