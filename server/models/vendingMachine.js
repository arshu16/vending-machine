'use strict';

import sequelize from "sequelize";

const definition = {
    money: {
        type: sequelize.FLOAT,
        validate: {
            isFloat: true,  
            min: 0.0
        }
    },
    change: {
        type: sequelize.FLOAT,
        validate: {
            isFloat: true,  
            min: 0.0
        }
    },
    collectableItems: {
        type: sequelize.ARRAY(sequelize.ENUM('Caramel', 'Hazelnut', 'Organic Raw')),
    }
}

export default {
    name: 'vendingMachine',
    definition
};
