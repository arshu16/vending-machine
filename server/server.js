'use strict';
import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import cors from 'cors';

const server = express();
server.set('env', 'development');
server.set('port', 8080);
server.set('hostname', 'localhost');
server.use(cors({ origin: true }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(router);

export default server;

