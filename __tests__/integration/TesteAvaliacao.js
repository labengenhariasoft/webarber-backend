const request = require("supertest");
const app = require("../../src/app");
let { AvaliacaoTeste, UsuarioTeste, BarbeariaTeste, AgendamentoTeste, ModeradorTeste } = require("../cases");

module.exports = () => {

    test("Deve atualizar um agendamento para concluído", async () => {
        const response = await request(app)
        .patch("/agendamentos")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send({ ...AgendamentoTeste, idStatus: 3 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Agendamento atualizado");
    });

    test("Deve cadastrar uma avaliação", async () => {
        const response = await request(app)
        .post("/avaliacoes")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send(AvaliacaoTeste);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(AvaliacaoTeste.id);
        expect(response.body.titulo).toBe(AvaliacaoTeste.titulo);
        expect(response.body.descricao).toBe(AvaliacaoTeste.descricao);
        expect(response.body.nota).toBe(AvaliacaoTeste.nota);
        expect(response.body.idAgendamento).toBe(AvaliacaoTeste.idAgendamento);
    });

    test("Deve retornar as avaliações de uma barbearia", async () => {
        const response = await request(app)
        .get(`/avaliacoes/${BarbeariaTeste.id}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(0);
        expect(response.body[0].id).toBe(AvaliacaoTeste.id);
        expect(response.body[0].titulo).toBe(AvaliacaoTeste.titulo);
        expect(response.body[0].descricao).toBe(AvaliacaoTeste.descricao);
        expect(response.body[0].nota).toBe(AvaliacaoTeste.nota);
        expect(response.body[0].idAgendamento).toBe(AvaliacaoTeste.idAgendamento);
    });

    test("Não deve permitir que o usuário cadastre mais de uma avaliação para um mesmo agendamento", async () => {
        const response = await request(app)
        .post("/avaliacoes")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send(AvaliacaoTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Usuário já realizou esta avaliação");
    });

    test("Não deve cadastrar uma avaliação para agendamento inválido", async () => {
        const response = await request(app)
        .post("/avaliacoes")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send({ ...AvaliacaoTeste, idAgendamento: 99 });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Agendamento inexistente");
    });

    test("Não deve permetir que um moderador cadastre uma avaliação", async () => {
        const response = await request(app)
        .post("/avaliacoes")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send(AvaliacaoTeste);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Rota restrita à usuários");
    });

    test("Deve atualizar um agendamento para andamento", async () => {
        const response = await request(app)
        .patch("/agendamentos")
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`)
        .send({ ...AgendamentoTeste, idStatus: 2 });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Agendamento atualizado");
    });

    test("Não deve cadastrar uma avaliação para agendamento que não esteja concluído", async () => {
        const response = await request(app)
        .post("/avaliacoes")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`)
        .send(AvaliacaoTeste);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Este agendamento não foi concluído");
    });

    test("Não deve excluir uma avaliação inexistente", async () => {
        const response = await request(app)
        .delete("/avaliacoes/99")
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Avaliação inexistente");
    });

    test("Não deve permitir que um moderar exclua uma avaliação", async () => {
        const response = await request(app)
        .delete(`/avaliacoes/${AvaliacaoTeste.id}`)
        .set("Authorization", `Bearer ${ModeradorTeste.jwt}`);

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Rota restrita à usuários");
    });

    test("Deve excluir uma avaliação que seja do usuário", async () => {
        const response = await request(app)
        .delete(`/avaliacoes/${AvaliacaoTeste.id}`)
        .set("Authorization", `Bearer ${UsuarioTeste.jwt}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Avaliação deletada com sucesso");
    });
};