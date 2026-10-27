const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { apiKeyAuth, rateLimit } = require('./middleware/apiSecurity');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(apiKeyAuth);
app.use(rateLimit);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/students', require('./routes/students'));
app.use('/api', require('./routes/api'));

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  console.error('Unhandled API error');
  return res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});