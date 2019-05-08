'use strict';
const path = require('path');
const fs = require('fs-extra');

const migrationConfig =  {
  "development": {
    "username": "localdbuser",
    "database": "vendingMachine",
    "password": "localdbpassword",
    "host": "postgres",
    "dialect": "postgres"
  }
}

const configPath = path.join(__dirname, '../config.json');

fs.writeJSONSync(configPath, migrationConfig);