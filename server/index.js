'use strict';

import server from './server';

const hostname = server.get('hostname') || 'localhost';
const port = server.get('port') || 8080;

server.listen(port, () => {
    console.log(`Express Server listening on -- http://${hostname}:${port}`);
});

process.on('unhandledRejection', error => {
    console.error('We are not handling promise rejection ', error);
});