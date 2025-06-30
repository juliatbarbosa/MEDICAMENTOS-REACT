async function connect() {
  if (global.connection && global.connection.state !== "disconnected") {
    return global.connection;
  }

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection({
    host: "54.91.193.137",
    user: "libertas",
    password: "123456",
    database: "libertas5per",
  });
  global.connection = connection;
  return connection;
}

exports.createTable = async (req, res, next) => {
  const con = await connect();
  const sql = `
    CREATE TABLE IF NOT EXISTS medicamento (
      idmedicamento INT AUTO_INCREMENT,
      nome VARCHAR(50) NOT NULL,
      quantidade INT NOT NULL,
      tipo VARCHAR(20) NOT NULL,
      fabricante VARCHAR(50) NOT NULL,
      PRIMARY KEY(idmedicamento)
    );
  `;
  await con.query(sql);
  res.status(201).send({ message: "Tabela criada com sucesso!", success: true });
};

exports.post = async (req, res, next) => {
  const con = await connect();
  const sql =
    "INSERT INTO medicamento (nome, quantidade, tipo, fabricante) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.nome,
    req.body.quantidade,
    req.body.tipo,
    req.body.fabricante
  ];
  await con.query(sql, values);
  res.status(201).send({ message: "Medicamento inserido com sucesso!", success: true });
};

exports.put = async (req, res, next) => {
  let id = req.params.id;
  const con = await connect();
  const sql =
    "UPDATE medicamento SET nome = ?, quantidade = ?, tipo = ?, fabricante = ? WHERE idmedicamento = ?";
  const values = [
    req.body.nome,
    req.body.quantidade,
    req.body.tipo,
    req.body.fabricante,
    id
  ];
  await con.query(sql, values);
  res.status(201).send({ message: "Medicamento alterado com sucesso!", success: true });
};

exports.delete = async (req, res, next) => {
  let id = req.params.id;
  const con = await connect();
  const sql =
    "DELETE FROM medicamento WHERE idmedicamento = ?";
  const values = [id];
  await con.query(sql, values);
  res.status(200).send({ message: "Medicamento excluído com sucesso!", success: true });
};

exports.get = async (req, res, next) => {
  const con = await connect()
  const nome = req.query.nome;

  let sql = "SELECT * FROM medicamento";
  let parametros = [];

  if (nome) {
    sql += " WHERE nome LIKE ?";
    parametros.push(`%${nome}%`);
  }

  const [rows] = await con.query(sql, parametros);

  res.status(200).send(rows);
};

exports.getById = async (req, res, next) => {
  let id = req.params.id;
  const con = await connect();
  const sql =
    "SELECT * FROM medicamento WHERE idmedicamento = ?";
  const values = [id];
  const [rows] = await con.query(sql, values);

  if (rows.length === 0) {
    return res.status(404).send({ message: "Not Found", success: false });
  }

  res.status(200).send(rows[0]);
};