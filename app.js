const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('./src/config/database');
const routes = require('./src/routes/routes');
const swaggerSetup = require('./src/docs/swagger');

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(morgan('dev'));

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

routes(app);

swaggerSetup(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});