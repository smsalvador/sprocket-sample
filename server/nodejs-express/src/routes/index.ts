import express from 'express';

import { setRoutes as sprocketSetRoutes } from './sprocket';
import { setRoutes as sprocketFactorySetRoutes } from './sprocketFactory';
import { setRoutes as sprocketFactoryProductionSetRoutes } from './sprocketFactoryProduction';

const router = express.Router();

sprocketSetRoutes(router)
sprocketFactorySetRoutes(router)
sprocketFactoryProductionSetRoutes(router)

export default router;
