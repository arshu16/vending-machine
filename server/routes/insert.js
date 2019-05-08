'use strict';
import express from 'express';
import backendController from '../controllers/backendController';
let router = express.Router();

router.post('/', backendController.insertMoney);

export default router;