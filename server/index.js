const express = require('express');
const app = express();
const router = require('./routes.js');
const cors = require('cors');
const morgan = require('morgan');
const port = 3000 || process.env.port;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
})