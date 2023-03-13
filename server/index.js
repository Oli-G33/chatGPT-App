const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const { Configuration, OpenAIApi } = require('openai');
const openAiRoutes = require('./routes/openai.js');
const authRoutes = require('./routes/auth.js');

// Configuration //
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// OPEN AI Config //

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY
});

const openai = new OpenAIApi(configuration);

// Routes //

app.use('/openai', openAiRoutes);
app.use('/auth', authRoutes);

// Server configuration //
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = { openai };
