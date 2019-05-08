'use strict';
import express from 'express';
let router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({version: 1.0});
});

export default router;