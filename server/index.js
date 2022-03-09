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

// module.exports {
//   async query(text, params) {
//     const start = Date.now();
//     const res = await pool.query(text, params);
//     const duration = Date.now() - start;
//     console.log('Query executed', { text, duration, rows: res.rowCount})
//     return res
//   }
// }