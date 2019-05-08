import Sequelize from "sequelize";
import vendingMachine from '../models/vendingMachine';
import config from './config.json';
console.log('This is the json', config);
const models = [
    vendingMachine
];

const db = new Sequelize('vendingMachine', 'localdbuser', 'localdbpassword', {
    host: 'postgres',
    dialect: "postgres",
    benchmark: true,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    define: {
        freezeTableName: true
    }
});

models.forEach(model => {
    db.define(model.name, model.definition);
});

export default db;