'use strict';
import express from 'express';
import backendController from '../controllers/backendController';
let router = express.Router();

router.get('/', backendController.returnChange);

export default router;