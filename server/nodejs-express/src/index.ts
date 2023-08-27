import 'reflect-metadata';

import cors from 'cors'
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import * as dotenv from 'dotenv'
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

import { appDataSource } from './core/dataSource';
import Router from './routes';

dotenv.config()

const app: express.Application = express();

const server: http.Server = http.createServer(app);
const port = process.env.PORT;

app.use(bodyparser.json());
app.use(cors());
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});
app.use(express.static('public'));

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.json()
    )
}));

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.json()
    )
}));

app.use(
  '/api/ui',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

app.use(Router);

server.listen(port, () => {
    console.info(`Server running at http://localhost:${port}`);
});

(async () => {
  await appDataSource.initialize();
})();
