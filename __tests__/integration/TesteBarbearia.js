const request = require("supertest");
const app = require("../../src/app");
let { BarbeariaTeste, jwtModerador, jwtUsuario } = require("../cases");

module.exports = () => {
    test('Não deve permitir que um usuário crie uma barberia', async () =>{
        const response = await request(app)
        .post('/barbearias')
        .set('Authorization', `Bearer ${jwtUsuario}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('É necessário informar um moderador para criar uma barbearia');
    });

    test('Deve permitir que um moderador crie uma barberia', async () =>{
        const response = await request(app)
        .post('/barbearias')
        .set('Authorization', `Bearer ${jwtModerador}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        BarbeariaTeste.id = response.body.id;
        expect(response.body.nome).toBe(BarbeariaTeste.nome);
        expect(response.body.endereco).toBe(BarbeariaTeste.endereco);
        expect(response.body.telefone).toBe(BarbeariaTeste.telefone);
        expect(response.body.horarioAbertura).toBe(BarbeariaTeste.horarioAbertura);
        expect(response.body.horarioFechamento).toBe(BarbeariaTeste.horarioFechamento);
        expect(response.body.user_id).toBe(BarbeariaTeste.user_id);
        expect(response.body.ativo).toBe(true);
        expect(response.body.complemento).toBe(BarbeariaTeste.complemento);
        expect(response.body.numero).toBe(BarbeariaTeste.numero);
        expect(response.body.bloco).toBe(BarbeariaTeste.bloco);
        expect(response.body.cep).toBe(BarbeariaTeste.cep);
    });

    test("Não deve permitir que o usuário crie outra barbearia", async () => {
        const response = await request(app)
        .post('/barbearias')
        .set('Authorization', `Bearer ${jwtModerador}`)
        .send(BarbeariaTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Usuário já possui uma barbearia');
    });

    test("Deve retornar uma certa barbearia", async () => {
        const response = await request(app)
        .get(`/barbearias?nome=${BarbeariaTeste.nome}`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(0);
        expect(response.body[0].nome).toBe(BarbeariaTeste.nome);
        expect(response.body[0].endereco).toBe(BarbeariaTeste.endereco);
        expect(response.body[0].telefone).toBe(BarbeariaTeste.telefone);
        expect(response.body[0].horarioAbertura).toBe(BarbeariaTeste.horarioAbertura);
        expect(response.body[0].horarioFechamento).toBe(BarbeariaTeste.horarioFechamento);
        expect(response.body[0].user_id).toBe(BarbeariaTeste.user_id);
        expect(response.body[0].ativo).toBe(true);
    });

    test("Ao buscar uma barbearia inexistente, deve retornar barbearia não encontrada", async () => {
        const response = await request(app)
        .get(`/barbearias?nome=${999}`);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
    });

    test("Deve retornar uma lista com todas as barberias", async () => {
        const response = await request(app)
        .get("/barbearias/")
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.body[0].nome).toBe(BarbeariaTeste.nome);
        expect(response.body[0].endereco).toBe(BarbeariaTeste.endereco);
        expect(response.body[0].telefone).toBe(BarbeariaTeste.telefone);
        expect(response.body[0].horarioAbertura).toBe(BarbeariaTeste.horarioAbertura);
        expect(response.body[0].horarioFechamento).toBe(BarbeariaTeste.horarioFechamento);
        expect(response.body[0].user_id).toBe(BarbeariaTeste.user_id);
        expect(response.body[0].ativo).toBe(true);
    });
    
    test("Deve retornar a barberia do moderador", async () => {
        const response = await request(app)
        .get(`/barbearias/moderador/`)
        .set('Authorization', `Bearer ${jwtModerador}`)

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe(BarbeariaTeste.nome);
        expect(response.body.endereco).toBe(BarbeariaTeste.endereco);
        expect(response.body.telefone).toBe(BarbeariaTeste.telefone);
        expect(response.body.horarioAbertura).toBe(BarbeariaTeste.horarioAbertura);
        expect(response.body.horarioFechamento).toBe(BarbeariaTeste.horarioFechamento);
        expect(response.body.user_id).toBe(BarbeariaTeste.user_id);
        expect(response.body.ativo).toBe(true);
    });

    test("Deve atualizar uma barbearia", async () => {
        BarbeariaTeste.nome = "Barbearia atualizada";
        BarbeariaTeste.endereco = "Novo endereço";
        const response = await request(app)
        .patch(`/barbearias/`)
        .set('Authorization', `Bearer ${jwtModerador}`)
        .send(BarbeariaTeste)

        expect(response.status).toBe(200)
        expect(response.body.nome).toBe('Barbearia atualizada');
        expect(response.body.endereco).toBe('Novo endereço');
    });

    /* test("Deve retornar uma barbearia inválida", async () => {
        const response = await request(app)
        .patch("/barbearias/9999")
        .send(BarbeariaTeste)

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Barbearia não encontrada');
    }); */

    test("Deve deletar uma barberia", async () => {
        const response = await request(app)
        .delete(`/barbearias/`)
        .set('Authorization', `Bearer ${jwtModerador}`)

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Barbearia deletada');
    });

    /* test("Não deve deletar uma barberia inválida", async () => {
        const response = await request(app)
        .delete("/barbearias/9999")

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Barbearia não encontrada');
    });   */
}