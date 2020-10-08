module.exports = (sequelize, DataTypes) => {
    const StatusAgendamento = sequelize.define("StatusAgendamento", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nome: DataTypes.STRING,
    }, {
        timestamps: false
    });

    // StatusAgendamento.associate = function (models) {
    //     // associations can be defined here
    //     StatusAgendamento.belongsTo(models.Agendamentos);
    // };

    return StatusAgendamento;
};
