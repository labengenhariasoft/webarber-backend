const { Barbearia } = require('../models');

module.exports = {

    async getAll(_, res) {
        try {
            const barbearias = await Barbearia.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
    
            if (!barbearias) {
                return res.status(400).json({ message: 'Nenhuma barberia encontrada'});
            }
    
            return res.status(200).json(barbearias);
        } catch(error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao buscar barberias' });
        }
    },

    async get(req, res) {
        try {
            const { barbearia_id } = req.params;
            const barbearia = await Barbearia.findOne({ where: { 
                id: barbearia_id
            }});
            
            if(!barbearia) {
                return res.status(400).json({ message: 'Barbearia não encontrada'});
            }
            
            return res.status(200).json(barbearia);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao buscar barberia' });
        }
    },

    async create(req, res) {
        try {
            const { nome, endereco, telefone, horarioAbertura, horarioFechamento, icone } = req.body;
            const barberia = await Barbearia.findOne({ where: { nome: nome }});
            
            if (barberia) {
                return res.status(400).json({ message: 'Já existe uma barbearia com este nome'});
            }

            const novaBarbearia = await Barbearia.create({ nome, endereco, telefone, horarioAbertura, horarioFechamento });
            return res.status(201).json(novaBarbearia);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao criar uma barbearia' });
        }

    },

    async update(req, res) {
        const { barbearia_id } = req.params;
        const { nome, endereco, telefone, horarioAbertura, horarioFechamento, icone } = req.body;

        const barberia = await Barbearia.findByPk(barbearia_id);

        if (!barberia) {
            return res.status(400).json({ message: 'Barbearia não encontrada'});
        }

        const barbeariaAtualizada = await barberia.update({
            nome: nome || barberia.nome,
            endereco: endereco || barberia.endereco,
            telefone: telefone || barberia.telefone,
            horarioAbertura: horarioAbertura || barberia.horarioAbertura,
            horarioFechamento: horarioFechamento || barberia.horarioFechamento,
            icone: icone || barberia.icone,
        })

        return res.status(200).json(barbeariaAtualizada);
    },

    async delete(req, res) {
        try {

            const { barbearia_id } = req.params;
            const barbearia = await Barbearia.findByPk(barbearia_id);

            if (!barbearia) {
                return res.status(400).json({ message: 'Barbearia não encontrada' });
            }

            await barbearia.update({ 
                ativo: false
            })
    
            return res.status(200).json({ message: "Barbearia deletada"});
        } catch(error) {
            console.log(error);
            return res.status(400).json({ message: 'Erro ao deletar barberia' });
        }

    }
};