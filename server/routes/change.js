'use strict';
import express from 'express';
import backendController from '../controllers/backendController';
let router = express.Router();

router.post('/add', backendController.addChange);
router.get('/collect', backendController.collectChange);

export default router;