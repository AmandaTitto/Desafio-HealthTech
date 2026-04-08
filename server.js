// == 1.Importações

const express = require("express");
const {criarBanco} = require("./database");

const app = express();

app.use(express.json());

// == 2.Porta

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
            <p> Adicione o "/pacientes" no enderço do site para acesso aos prontuarios</p>
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