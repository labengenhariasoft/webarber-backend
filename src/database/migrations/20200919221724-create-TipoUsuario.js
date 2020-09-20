'use strict';

const TipoUsuario = require('../../app/models/TipoUsuario');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("TipoUsuario", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            tipoDescricao: {
                type: Sequelize.STRING,
                allowNull: false
            },
        }, {
            timestamps: false,
            freezeTableName: true
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('TipoUsuario');
    }
};