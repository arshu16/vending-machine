'use strict';
import express from 'express';
import pingRoute from './routes/ping';
import insertRoute from './routes/insert';
import itemRoute from './routes/item';
import returnRoute from './routes/return';
import changeRoute from './routes/change';
import backendController from './controllers/backendController';

const router = express.Router();
router.get('/', backendController.getState);
router.use('/ping', pingRoute);
router.use('/insert', insertRoute);
router.use('/item', itemRoute);
router.use('/return', returnRoute);
router.use('/change', changeRoute);

export default router;