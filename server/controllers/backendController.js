'use strict';
import db from '../db';

//TODO : have a better place for this
const idToItemMap = {
    1: {
        name: 'Caramel',
        price: 2.50
    },
    2: {
        name: 'Hazelnut',
        price: 3.10
    },
    3: {
        name: 'Organic Raw',
        price: 2.00
    }
    
}

async function insertMoney(req, res, next) {
    const {amount} = req.body;
    const data = await db.models.vendingMachine.findOne({where:{id: 1}});
    const newAmount = data.money + amount;
    const result =  await db.models.vendingMachine.update({money: newAmount},{ where: {
        id: 1
    },  returning: true});
    res.set('Content-Type', 'application/json');
    return res.status(200).send(result[1]);
}

async function getItem(req, res, next) {
    const {id} = req.body;
    const {name, price} = idToItemMap[id];
    const data = await db.models.vendingMachine.findOne({where:{id: 1}});
    const newAmount = data.money - price;
    const newItems = data.collectableItems.slice();
    newItems.push(name);
    const result =  await db.models.vendingMachine.update({money: newAmount, collectableItems: newItems},{ where: {
        id: 1
    },  returning: true});
    res.set('Content-Type', 'application/json');
    return res.status(200).send(result[1]);
}

async function returnChange(req, res, next) {
    const data = await db.models.vendingMachine.findOne({where:{id: 1}});
    const result =  await db.models.vendingMachine.update({money: 0.0, change: data.change + data.money},{ where: {
        id: 1
    },  returning: true});
    res.set('Content-Type', 'application/json');
    return res.status(200).send(result[1]);
}

async function addChange(req, res, next) {
    const {amount} = req.body;
    const data = await db.models.vendingMachine.findOne({where:{id: 1}});
    const newAmount = data.change + amount;
    const result =  await db.models.vendingMachine.update({change: newAmount},{ where: {
        id: 1
    },  returning: true});
    res.set('Content-Type', 'application/json');
    return res.status(200).send(result[1]);
}

async function collectChange(req, res, next) {
    const result =  await db.models.vendingMachine.update({change: 0.0},{ where: {
        id: 1
    },  returning: true});
    res.set('Content-Type', 'application/json');
    return res.status(200).send(result[1]);
}

async function collectItem(req, res, next) {
    const result =  await db.models.vendingMachine.update({collectableItems: []},{ where: {
        id: 1
    },  returning: true});
    res.set('Content-Type', 'application/json');
    return res.status(200).send(result[1]);
}


async function getState(req, res, next) {
    const result = await db.models.vendingMachine.findOne({where:{id: 1}});
    res.set('Content-Type', 'application/json');
    return res.status(200).send({...result.dataValues, items: idToItemMap});
}

export default {
  getState,  insertMoney, getItem, returnChange, addChange, collectChange, collectItem
}