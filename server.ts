require('dotenv').config();

import * as express from 'express';

const app = express();

const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const errorHandler = require('./_middleware/error-handler');

const crawl = require('./crawl');

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'development') {
   app.use(
      cors({
         origin: process.env.CLIENT_URL_TEST,
      }),
   );
   app.use(morgan('dev'));
} else {
   app.use(
      cors({
         origin: process.env.CLIENT_URL,
      }),
   );
}

crawl.restock(2675860, '02(30~31inch)');

// global error
app.use(errorHandler);

const port = process.env.PORT;

app.listen(port, () => console.log(`server running on port ${port}`));
