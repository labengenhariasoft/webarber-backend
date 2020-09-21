module.exports = (sequelize, DataTypes) => {
    const ServicoBarbearia = sequelize.define("ServicoBarbearia", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        titulo: DataTypes.STRING,
        preco: DataTypes.STRING,
    }, {
        freezeTableName: true,
        timestamps: false
    }, {
        freezeTableName: true,
        timestamps: false
    });

    // ServicoBarbearia.associate = function (models) {
    //     // associations can be defined here
    //     ServicoBarbearia.belongsTo(models.Agendamentos);
    //     ServicoBarbearia.belongsTo(models.ServicoBarbearia);
    // };

    return ServicoBarbearia;
};

