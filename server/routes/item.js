'use strict';
import express from 'express';
import backendController from '../controllers/backendController';
let router = express.Router();

router.post('/get', backendController.getItem);
router.get('/collect', backendController.collectItem);

export default router;