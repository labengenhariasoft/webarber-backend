'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Barbearia', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            nomeBarbearia: {
                type: Sequelize.STRING,
                allowNull: false 
            },
            endereco: {
                type: Sequelize.STRING,
                allowNull: false
            },
            telefone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            ativo: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            icone: Sequelize.STRING.BINARY,
            mediaNota: Sequelize.FLOAT,
            horarioAbertura: {
                type: Sequelize.DATE,
                allowNull: false
            },
            horarioFechamento: {
                type: Sequelize.DATE,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {
            freezeTableName: true
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Barbearia');
    }
};