// == 1.Importações

const sqlite3 = require("sqlite3");
const {open} = require("sqlite");




// == 2.Funções: Tabela Pacientes

const criarBanco = async () => {

    const db = await open({
        filename: "./database.db",
        driver: sqlite3.Database
    });

    await db.exec(
        `
        CREATE TABLE IF NOT EXISTS pacientes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data_do_atendimento TEXT,
        nome_do_paciente TEXT,
        endereco TEXT,
        telefone TEXT,
        historico_do_atendimento TEXT,
        observacoes TEXT
        )
        `
    );
    console.log("Banco de dados configurado: tabela de pacientes");

    const verificarPacientes = await db.get(
        `
        SELECT COUNT (*) AS todos FROM pacientes
        `
    );

    if(verificarPacientes.todos === 0) {
        await db.exec(
            `
            INSERT INTO pacientes (data_do_atendimento, nome_do_paciente, endereco, telefone, historico_do_atendimento, observacoes) VALUES
            ("01/04/2026", "Mariana Alves Souza", "Rua das Palmeiras 245 – Copacabana", "21 99876-5432", "Paciente apresentou leve confusão mental durante o atendimento", "Manter rotina de medicação conforme prescrição"),
            ("02/04/2026", "Carlos Eduardo Mendes", "Av. Brasil 1020 - Centro", "21 98765-1122", "Paciente com mobilidade reduzida. Realizada troca de curativo em ferida na perna esquerda", "Diabético tipo 2"),
            ("03/04/2026", "Jose Ribeiro Costa", "Rua São Clemente 88 – Botafogo", "21 97654-3344", "Idoso independente, porém com queixa de tontura ao levantar", "Nenhuma")
            `
        );
    }else{
        console.log(`Banco pronto com ${verificarPacientes.todos} de pacientes`);
    };

    const todosOsPacientes = await db.all(
        `
        SELECT * FROM pacientes
        `
    );
    console.table(todosOsPacientes);

    return db;
};

module.exports = {criarBanco};