// models/db.js
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("hospital", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Sucesso");
  } catch (error) {
    throw new Error("Falha ao conectar com o Banco de Dados", error)
  }
}
connectDatabase();
module.exports = sequelize;
