const express = require('express');
const app = express();

const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));

const routes = require('./routes/routes.js');
app.use('/qa', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
