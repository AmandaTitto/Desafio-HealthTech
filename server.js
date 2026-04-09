// == 1.Importações

const express = require("express");
const {criarBanco} = require("./database");

const app = express();

app.use(express.json());

// == 2.Porta do Site

const PORT = 3000;

app.listen(PORT, () => {
    console.log(
        `
        Servidor rodando em http://localhost:${PORT}
        `
    );
});

// == 3."Mini FrontEnd"

app.get("/", (req,res) => {
    res.send(
        `
        <body>
            <h1> HealthTech </h1>
            <h2> Prontuários dos Pacientes </h2>
            <p> Adicione o "/pacientes" no enderço do site para acesso aos prontuarios </p>
            <p> Após o passo acima, adicione "/"nome_do_paciente"" para verificar o histórico de uma pessoa específica </p>
            <p> Para incluir cadastros, utilize o Postman em "Adicionar dados"</p>
        </body>
        `
    );
});

// == 4. Rotas

app.get("/pacientes", async (req,res) => {
    const db = await criarBanco();

    const prontuarios = await db.all(
        `
        SELECT * FROM pacientes
        `
    );

    res.json(prontuarios);
});

app.get("/pacientes/:nome_do_paciente", async (req,res) => {
    const {nome_do_paciente} = req.params;
    
    const db = await criarBanco();

    const casosDosPacientes = await db.all(
        `
        SELECT * FROM pacientes WHERE nome_do_paciente = ?
        ` , [nome_do_paciente]
    );

    res.json(casosDosPacientes);

});


app.post("/pacientes", async (req,res) => {
    const {data_do_atendimento, nome_do_paciente, endereco, telefone, historico_do_atendimento, observacoes} = req.body;
        
    const db = await criarBanco();

    await db.run(
        `
        INSERT INTO pacientes(data_do_atendimento, nome_do_paciente, endereco, telefone, historico_do_atendimento, observacoes) VALUES
        (?, ?, ?, ?, ?, ?)
        ` , [data_do_atendimento, nome_do_paciente, endereco, telefone, historico_do_atendimento, observacoes]
    );

    res.send(`Consulta de ${nome_do_paciente} em ${data_do_atendimento} cadastrada com sucesso`);

});

app.put("/pacientes/:nome_do_paciente", async (req,res) => {
    const{nome_do_paciente} = req.params;

    const {id, data_do_atendimento, endereco, telefone, historico_do_atendimento, observacoes} = req.body;

    const db = await criarBanco();

    await db.run(
        `
        UPDATE pacientes 
        SET id = ?, data_do_atendimento = ?, endereco = ?, telefone = ?, historico_do_atendimento = ?, observacoes = ? 
        WHERE nome_do_paciente = ?
        ` , [id, data_do_atendimento, endereco, telefone, historico_do_atendimento, observacoes]
    );

    res.send(`Consulta de id nº ${id} de ${nome_do_paciente} foi editada com sucesso`);

});

app.delete("/pacientes/:nome_do_paciente", async (req,res) => {
    const{nome_do_paciente} = req.params;

    const db = await criarBanco();

    await db.run(
        `
        DELETE FROM pacientes WHERE nome_do_paciente = ?
        `, [nome_do_paciente]
    );

    res.send(`Consulta de id nº ${id} de ${nome_do_paciente} foi removido com sucesso`);

});