const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger,
  errorLogger, } = require('./middlewares/logger');
const errorResponse = require('./middlewares/errorResponse');
const router = require('./routes/main');
const cors = require('./middlewares/cors');

dotenv.config();

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cors);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);

app.use('/', router);
// app.use(express.static(path.join(__dirname, 'public')));

app.use(errorLogger);
app.use(errors());
app.use(errorResponse);

app.listen(3000);
