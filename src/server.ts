import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import BaseRouter from '@src/routes';
import Paths from '@src/common/constants/Paths';
import ENV from '@src/common/constants/ENV';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';
import { NodeEnvs } from '@src/common/constants';
import cors from 'cors';

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

/******************************************************************************
                                CORS
******************************************************************************/

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

/******************************************************************************
                                Middleware
******************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log des routes en mode Dev
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Sécurité en Production
if (ENV.NodeEnv === NodeEnvs.Production) {
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

/******************************************************************************
                                Swagger
******************************************************************************/

const swaggerPath = path.join(__dirname, 'DocumentationApi', 'api.yaml');
let swaggerDocument = {};

try {
  swaggerDocument = YAML.load(swaggerPath);
} catch (err) {
  console.error('ERREUR Swagger : impossible de charger api.yaml : ', err);
}

app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/******************************************************************************
                                ROUTES API
******************************************************************************/

app.use(Paths.Base, BaseRouter);

/******************************************************************************
                                ERROR HANDLER
******************************************************************************/

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});

/******************************************************************************
                                STATIC FILES / HTML
******************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

/******************************************************************************
                                ROUTE /
******************************************************************************/

app.get('/', (req: Request, res: Response) => {
  res.redirect('/apiDocs');
});

/******************************************************************************
                                Export
******************************************************************************/

export default app;
