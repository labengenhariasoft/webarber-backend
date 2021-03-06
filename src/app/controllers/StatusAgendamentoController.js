const { StatusAgendamento } = require("../models");

module.exports = {

    async obterStatusAgendamento(_, res) {
        try {
            let tipos = await StatusAgendamento.findAll({
                order: [
                    ["id", "ASC"]
                ]
            });
            return res.status(200).json(tipos);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Error while fetching" });
        }
    }
};