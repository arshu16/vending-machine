'use strict';

const types = ['Caramel', 'Hazelnut', 'Organic Raw'];

module.exports =  {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('vendingMachine', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            money: {
                allowNull: false,
                type: Sequelize.FLOAT,
                defaultValue: 0.0
            },
            change: {
                allowNull: false,
                type: Sequelize.FLOAT,
                defaultValue: 0.0
            },
            collectableItems: {
                allowNull: false,
                type: Sequelize.ARRAY(Sequelize.TEXT),
                set(val) {
                    const collectableItems = this.getDataValue('collectableItems');
                    if(types.indexOf(val) > - 1) {
                        collectableItems.push(val);
                        this.setDataValue('collectableItems', collectableItems);
                    }
                    else {
                        throw new Error('Only specific type of chocolate is allowed');
                    }
                },
                defaultValue: []
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date(),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date(),
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('vendingMachine', {cascade: true});
    }
}